"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CMS_STORAGE_KEY,
  createCmsId,
  getDefaultCmsContent,
  normalizeCmsContent
} from "@/lib/cms-defaults";
import type { CmsContent, CmsSaveResult } from "@/lib/cms-types";

export type {
  CmsAchievementItem,
  CmsCoachItem,
  CmsContent,
  CmsGalleryItem,
  CmsNewsItem,
  CmsSaveResult
} from "@/lib/cms-types";
export { CMS_STORAGE_KEY, createCmsId, getDefaultCmsContent };

declare global {
  interface Window {
    __KRSA_CMS_CONTENT__?: CmsContent;
  }
}

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
    return normalizeCmsContent(JSON.parse(stored), fallback);
  } catch {
    return fallback;
  }
};

const cacheContent = (nextContent: CmsContent) => {
  if (typeof window === "undefined") return;

  window.__KRSA_CMS_CONTENT__ = nextContent;

  try {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextContent));
  } catch {
    // The editor still works in memory when browser storage is unavailable.
  }
};

const readServerError = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || "Website content could not be published right now.";
  } catch {
    return "Website content could not be published right now.";
  }
};

export const useCmsContent = () => {
  const [content, setContentState] = useState<CmsContent>(() => getDefaultCmsContent());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const localContent = readStoredContent();
    setContentState(localContent);

    const syncContent = () => setContentState(readStoredContent());
    window.addEventListener("storage", syncContent);

    const loadPublishedContent = async () => {
      try {
        const response = await fetch("/api/cms", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as { content?: CmsContent };
        const nextContent = normalizeCmsContent(payload.content, localContent);

        if (active) {
          setContentState(nextContent);
          cacheContent(nextContent);
        }
      } catch {
        // Local defaults remain available if the content API is temporarily unavailable.
      } finally {
        if (active) setReady(true);
      }
    };

    void loadPublishedContent();

    return () => {
      active = false;
      window.removeEventListener("storage", syncContent);
    };
  }, []);

  const saveContent = useCallback(async (nextContent: CmsContent): Promise<CmsSaveResult> => {
    const normalizedContent = normalizeCmsContent(nextContent);
    setContentState(normalizedContent);
    cacheContent(normalizedContent);

    try {
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: normalizedContent })
      });

      if (!response.ok) {
        return { ok: false, message: await readServerError(response) };
      }

      const payload = (await response.json()) as { content?: CmsContent };
      const publishedContent = normalizeCmsContent(payload.content, normalizedContent);
      setContentState(publishedContent);
      cacheContent(publishedContent);
      return { ok: true };
    } catch {
      return {
        ok: false,
        message: "Saved only in this browser. Server publishing is unavailable right now."
      };
    }
  }, []);

  const resetContent = useCallback(async () => {
    const nextContent = getDefaultCmsContent();
    return saveContent(nextContent);
  }, [saveContent]);

  return { content, ready, saveContent, resetContent };
};
