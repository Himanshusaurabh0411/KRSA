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

export type CmsSaveResult = {
  ok: boolean;
  message?: string;
};
