import type { MetadataRoute } from "next";

const routes = [
  "",
  "about",
  "sports",
  "khelo-india",
  "athletes",
  "tournaments",
  "gallery",
  "news",
  "apply",
  "login",
  "admin",
  "portal/coach",
  "portal/athlete",
  "portal/student",
  "portal/parent",
  "portal/sai",
  "contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://krsasports.in";
  return routes.map((route) => ({
    url: `${baseUrl}/${route}`.replace(/\/$/, ""),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
