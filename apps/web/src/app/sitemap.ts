import type { MetadataRoute } from "next";

const routes = [
  "",
  "about",
  "sports",
  "coaches",
  "khelo-india",
  "gallery",
  "news",
  "apply",
  "contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://krsadelhi.in";
  return routes.map((route) => ({
    url: `${baseUrl}/${route}`.replace(/\/$/, ""),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
