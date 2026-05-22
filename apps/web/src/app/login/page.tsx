import { redirect } from "next/navigation";
import { academy } from "@/lib/data";

export default function LoginPage() {
  redirect(academy.nsrsPortalUrl);
}
