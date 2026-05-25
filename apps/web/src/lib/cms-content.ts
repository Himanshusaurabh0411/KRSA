"use client";

import { useCallback, useEffect, useState } from "react";
import { galleryItems, news } from "@/lib/data";

export type CmsNewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export type CmsGalleryItem = {
  id: string;
  title: string;
  type: string;
  category: string;
  image: string;
};

export type CmsAchievementItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

export type CmsContent = {
  news: CmsNewsItem[];
  gallery: CmsGalleryItem[];
  achievements: CmsAchievementItem[];
};

export const CMS_STORAGE_KEY = "krsa-public-content-v1";

declare global {
  interface Window {
    __KRSA_CMS_CONTENT__?: CmsContent;
  }
}

export const createCmsId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

export const getDefaultCmsContent = (): CmsContent => ({
  news: news.map((item) => ({
    id: createCmsId(),
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    image: item.image
  })),
  gallery: galleryItems.map((item) => ({
    id: createCmsId(),
    title: item.title,
    type: item.type,
    category: item.category,
    image: item.image
  })),
  achievements: [
    {
      id: createCmsId(),
      title: "Khelo India Accredited Basketball Academy",
      date: "2026",
      description: "KRSA is presented as a Khelo India Accredited Academy for basketball development in Delhi.",
      image: "/brand/krsa-academy-banner.jpeg"
    },
    {
      id: createCmsId(),
      title: "Grassroots Basketball Development",
      date: "Ongoing",
      description: "The academy continues to train young basketball players through structured batches, camps and court sessions.",
      image: "/media/gallery/krsa-gallery-team-lineup.jpg"
    }
  ]
});

const readStoredContent = (): CmsContent => {
  const fallback = getDefaultCmsContent();

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    if (window.__KRSA_CMS_CONTENT__) {
      return window.__KRSA_CMS_CONTENT__;
    }

    const stored = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as Partial<CmsContent>;

    return {
      news: parsed.news?.length ? parsed.news : fallback.news,
      gallery: parsed.gallery?.length ? parsed.gallery : fallback.gallery,
      achievements: parsed.achievements?.length ? parsed.achievements : fallback.achievements
    };
  } catch {
    return fallback;
  }
};

export const useCmsContent = () => {
  const [content, setContentState] = useState<CmsContent>(() => getDefaultCmsContent());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setContentState(readStoredContent());
    setReady(true);

    const syncContent = () => setContentState(readStoredContent());
    window.addEventListener("storage", syncContent);

    return () => {
      window.removeEventListener("storage", syncContent);
    };
  }, []);

  const saveContent = useCallback((nextContent: CmsContent) => {
    setContentState(nextContent);

    if (typeof window !== "undefined") {
      window.__KRSA_CMS_CONTENT__ = nextContent;

      try {
        window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextContent));
      } catch {
        // The in-browser editor still works in memory when storage is unavailable.
      }
    }
  }, []);

  const resetContent = useCallback(() => {
    const nextContent = getDefaultCmsContent();
    saveContent(nextContent);
  }, [saveContent]);

  return { content, ready, saveContent, resetContent };
};
