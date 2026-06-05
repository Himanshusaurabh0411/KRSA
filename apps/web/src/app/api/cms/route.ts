import { get, put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, readAdminSession } from "@/lib/admin-auth";
import { CMS_CONTENT_BLOB_PATH, getDefaultCmsContent, normalizeCmsContent } from "@/lib/cms-defaults";
import type { CmsContent } from "@/lib/cms-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const hasBlobStorageConfig = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID));

const jsonHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate"
};

const readPublishedContent = async (): Promise<CmsContent> => {
  const fallback = getDefaultCmsContent();

  if (!hasBlobStorageConfig()) {
    return fallback;
  }

  try {
    const blob = await get(CMS_CONTENT_BLOB_PATH, { access: "public" });
    if (!blob || blob.statusCode !== 200) return fallback;

    const text = await new Response(blob.stream).text();
    return normalizeCmsContent(JSON.parse(text), fallback);
  } catch (error) {
    console.error("KRSA CMS read failed", error);
    return fallback;
  }
};

const readAdminEmail = async () => {
  const cookieStore = await cookies();
  const session = readAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  return session?.email || null;
};

export async function GET() {
  const content = await readPublishedContent();
  return NextResponse.json({ content }, { headers: jsonHeaders });
}

export async function PUT(request: Request) {
  const adminEmail = await readAdminEmail();

  if (!adminEmail) {
    return NextResponse.json({ message: "Admin login required before publishing website content." }, { status: 401 });
  }

  if (!hasBlobStorageConfig()) {
    return NextResponse.json(
      { message: "Media storage is not connected yet. Add Vercel Blob to this Vercel project first." },
      { status: 503 }
    );
  }

  try {
    const payload = (await request.json()) as { content?: unknown };
    const content = normalizeCmsContent(payload.content);

    await put(CMS_CONTENT_BLOB_PATH, JSON.stringify(content), {
      access: "public",
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60
    });

    return NextResponse.json({ message: "Website content published.", content }, { headers: jsonHeaders });
  } catch (error) {
    console.error("KRSA CMS publish failed", error);
    return NextResponse.json(
      { message: "Website content could not be published right now. Check Vercel Blob storage settings." },
      { status: 500 }
    );
  }
}
