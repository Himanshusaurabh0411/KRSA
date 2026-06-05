import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, readAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"];

const hasBlobStorageConfig = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID));

const readAdminEmail = async () => {
  const cookieStore = await cookies();
  const session = readAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  return session?.email || null;
};

const normalizeUploadPath = (pathname: string) => pathname.replace(/^\/+/, "");

export async function POST(request: Request) {
  const adminEmail = await readAdminEmail();

  if (!adminEmail) {
    return NextResponse.json({ message: "Admin login required before uploading images." }, { status: 401 });
  }

  if (!hasBlobStorageConfig()) {
    return NextResponse.json(
      { message: "Image upload storage is not connected yet. Add Vercel Blob to this Vercel project first." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const normalizedPathname = normalizeUploadPath(pathname);

        if (!normalizedPathname.startsWith("cms-media/")) {
          throw new Error("Images must be uploaded into the CMS media folder.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_IMAGE_SIZE,
          addRandomSuffix: true,
          allowOverwrite: false,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
          tokenPayload: JSON.stringify({ adminEmail, clientPayload })
        };
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("KRSA admin image upload failed", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Image upload could not be started." },
      { status: 400 }
    );
  }
}
