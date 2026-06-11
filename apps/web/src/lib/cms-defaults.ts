import { galleryItems, news } from "@/lib/data";
import type {
  CmsAchievementItem,
  CmsCoachItem,
  CmsContent,
  CmsEventItem,
  CmsGalleryItem,
  CmsNewsItem
} from "@/lib/cms-types";

export const CMS_STORAGE_KEY = "krsa-public-content-v1";
export const CMS_CONTENT_BLOB_PATH = "cms/krsa-content.json";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);

export const createCmsId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

const cleanText = (value: unknown) => String(value || "").trim();
const cleanLines = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(cleanText).filter(Boolean);
  }

  return cleanText(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getDefaultCmsContent = (): CmsContent => ({
  news: news.map((item, index) => ({
    id: `news-${index + 1}-${slugify(item.title)}`,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    image: item.image
  })),
  gallery: galleryItems.map((item, index) => ({
    id: `gallery-${index + 1}-${slugify(item.title)}`,
    title: item.title,
    type: item.type,
    category: item.category,
    image: item.image
  })),
  achievements: [
    {
      id: "achievement-khelo-india-accredited-basketball-academy",
      title: "Khelo India Accredited Basketball Academy",
      date: "2026",
      description: "KRSA is presented as a Khelo India Accredited Academy for basketball development in Delhi.",
      image: "/brand/krsa-academy-banner.jpeg"
    },
    {
      id: "achievement-grassroots-basketball-development",
      title: "Grassroots Basketball Development",
      date: "Ongoing",
      description: "The academy continues to train young basketball players through structured batches, camps and court sessions.",
      image: "/media/gallery/krsa-gallery-team-lineup.jpg"
    }
  ],
  coaches: [
    {
      id: "coach-vidhya-ramanarayanan",
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
      id: "coach-ashok-rangeen",
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
      id: "coach-ajmer-singh",
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
      id: "coach-naresh-hooda",
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
  ],
  events: []
});

const normalizeNewsItem = (item: unknown, index: number): CmsNewsItem | null => {
  const record = item as Partial<CmsNewsItem>;
  const title = cleanText(record.title);
  const date = cleanText(record.date);
  const excerpt = cleanText(record.excerpt);
  const image = cleanText(record.image);
  if (!title || !date || !excerpt || !image) return null;

  return {
    id: cleanText(record.id) || `news-${index + 1}-${slugify(title)}`,
    title,
    date,
    excerpt,
    image
  };
};

const normalizeGalleryItem = (item: unknown, index: number): CmsGalleryItem | null => {
  const record = item as Partial<CmsGalleryItem>;
  const title = cleanText(record.title);
  const type = cleanText(record.type) || "Photo";
  const category = cleanText(record.category) || "Training";
  const image = cleanText(record.image);
  if (!title || !image) return null;

  return {
    id: cleanText(record.id) || `gallery-${index + 1}-${slugify(title)}`,
    title,
    type,
    category,
    image
  };
};

const normalizeAchievementItem = (item: unknown, index: number): CmsAchievementItem | null => {
  const record = item as Partial<CmsAchievementItem>;
  const title = cleanText(record.title);
  const date = cleanText(record.date);
  const description = cleanText(record.description);
  const image = cleanText(record.image);
  if (!title || !date || !description || !image) return null;

  return {
    id: cleanText(record.id) || `achievement-${index + 1}-${slugify(title)}`,
    title,
    date,
    description,
    image
  };
};

const normalizeCoachItem = (item: unknown, index: number): CmsCoachItem | null => {
  const record = item as Partial<CmsCoachItem>;
  const name = cleanText(record.name);
  const role = cleanText(record.role);
  const experience = cleanText(record.experience);
  const summary = cleanText(record.summary);
  const image = cleanText(record.image);
  if (!name || !role || !experience || !summary || !image) return null;

  return {
    id: cleanText(record.id) || `coach-${index + 1}-${slugify(name)}`,
    name,
    role,
    experience,
    summary,
    image,
    education: cleanLines(record.education),
    highlights: cleanLines(record.highlights),
    certifications: cleanLines(record.certifications)
  };
};

const normalizeEventItem = (item: unknown, index: number): CmsEventItem | null => {
  const record = item as Partial<CmsEventItem>;
  const title = cleanText(record.title);
  const startDate = cleanText(record.startDate);
  const image = cleanText(record.image);
  if (!title || !startDate || !image) return null;

  return {
    id: cleanText(record.id) || `event-${index + 1}-${slugify(title)}`,
    title,
    startDate,
    endDate: cleanText(record.endDate),
    time: cleanText(record.time),
    venue: cleanText(record.venue),
    description: cleanText(record.description),
    image,
    active: record.active === true
  };
};

const normalizeList = <T>(
  value: unknown,
  fallback: T[],
  normalizeItem: (item: unknown, index: number) => T | null
) => {
  if (!Array.isArray(value)) return fallback;
  return value.map(normalizeItem).filter((item): item is T => Boolean(item));
};

export const normalizeCmsContent = (input: unknown, fallback = getDefaultCmsContent()): CmsContent => {
  const content = (input || {}) as Partial<CmsContent>;

  return {
    news: normalizeList(content.news, fallback.news, normalizeNewsItem),
    gallery: normalizeList(content.gallery, fallback.gallery, normalizeGalleryItem),
    achievements: normalizeList(content.achievements, fallback.achievements, normalizeAchievementItem),
    coaches: normalizeList(content.coaches, fallback.coaches, normalizeCoachItem),
    events: normalizeList(content.events, fallback.events, normalizeEventItem)
  };
};
