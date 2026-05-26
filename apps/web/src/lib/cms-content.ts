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

export type CmsCoachItem = {
  id: string;
  name: string;
  role: string;
  experience: string;
  summary: string;
  image: string;
  education: string[];
  highlights: string[];
  certifications: string[];
};

export type CmsContent = {
  news: CmsNewsItem[];
  gallery: CmsGalleryItem[];
  achievements: CmsAchievementItem[];
  coaches: CmsCoachItem[];
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
  ],
  coaches: [
    {
      id: createCmsId(),
      name: "Mrs. Vidhya Ramanarayanan",
      role: "Female Coach, Krishna Rattan Sports Academy",
      experience: "40+ years in basketball",
      summary:
        "Dedicated basketball coach and former national-level player known for promoting women's basketball and building strong school teams.",
      image: "/coaches/vidhya-ramanarayanan.jpeg",
      education: ["Bachelor of Commerce (B.Com)", "Diploma in Basketball, 1982"],
      highlights: [
        "Coach, School Basketball Team at KRSA",
        "Represented India at the 1982 Asian Games, New Delhi",
        "Junior India Team, 1980",
        "Indian Railways Basketball Team from 1979"
      ],
      certifications: ["Recipient of Railway Minister Madhav Rao Scindia Award"]
    },
    {
      id: createCmsId(),
      name: "Mr. Ashok Rangeen",
      role: "Head Coach, Krishna Rattan Sports Academy",
      experience: "35+ years in basketball coaching",
      summary:
        "Senior basketball coach with national and international coaching experience, discipline-focused training methods and long-term school coaching leadership.",
      image: "/coaches/ashok-rangeen.jpeg",
      education: ["B.Com", "B.P.Ed", "NIS Diploma in Basketball Coaching, 1976-1977"],
      highlights: [
        "Basketball Coach, National Institute of Sports (NIS), 1979-1980",
        "Coach, Delhi Public School Mathura Road, 1980-2016",
        "Member, Basketball Federation of India",
        "Member, Delhi Basketball Association"
      ],
      certifications: ["FIBA Certified International Coach"]
    },
    {
      id: createCmsId(),
      name: "Ajmer Singh",
      role: "Basketball Coach",
      experience: "10+ years of experience",
      summary:
        "Energetic basketball coach with experience in mentoring students, strengthening and conditioning, and developing players for higher-level competition.",
      image: "/coaches/ajmer-singh.jpeg",
      education: [
        "Graduation from MDU University Rohtak, Haryana, 2006",
        "B.P.Ed from Singhania University, 2019",
        "Diploma in Sports Coaching (Basketball), 2016-2020",
        "Strength and Conditioning course from AFMSC Pune",
        "Certificate course, NIS Patiala"
      ],
      highlights: [
        "Coach, Army RED team at Delhi Subroto Park",
        "Coached 200+ national-level players",
        "Coached 20+ international-level players",
        "Skilled in communication, leadership, time management and first aid"
      ],
      certifications: ["Diploma in Sports Coaching (Basketball)", "Certificate course, NIS Patiala"]
    },
    {
      id: createCmsId(),
      name: "Naresh Hooda",
      role: "Basketball Coach",
      experience: "Young coach with national coaching exposure",
      summary:
        "Basketball coach with NIS training, WABC Level 1 clearance and experience across clubs, schools and college-level basketball programs.",
      image: "/coaches/naresh-hooda.jpeg",
      education: [
        "Six-week Certification Course (Basketball), NIS Patiala, 2019",
        "Graduation, Kirorimal College, Delhi University, 2021",
        "Diploma in Sports Coaching (Basketball), NIS Patiala, 2022",
        "WABC Level 1 cleared, 2022",
        "B.P.Ed, 2024"
      ],
      highlights: [
        "Represented Delhi as basketball coach at Hyderabad 2024 national tournament, Silver Medal",
        "Represented Delhi as basketball coach at Puducherry 2023 national tournament",
        "Basketball Coach at Roshanara Club for 3 years",
        "Basketball Coach at Mater Dei School for 2 years",
        "Basketball Coach at SRCC College for 2 years"
      ],
      certifications: ["NIS Basketball Certification", "WABC Level 1 cleared"]
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
      achievements: parsed.achievements?.length ? parsed.achievements : fallback.achievements,
      coaches: parsed.coaches?.length ? parsed.coaches : fallback.coaches
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
