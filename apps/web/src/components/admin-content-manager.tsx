"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { upload } from "@vercel/blob/client";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ImageIcon,
  Newspaper,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  UploadCloud,
  UserRound,
  Star
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CmsAchievementItem,
  CmsCoachItem,
  CmsEventItem,
  CmsGalleryItem,
  CmsNewsItem,
  createCmsId,
  useCmsContent
} from "@/lib/cms-content";

const blankNews: CmsNewsItem = { id: "", title: "", date: "", excerpt: "", image: "" };
const blankAchievement: CmsAchievementItem = { id: "", title: "", date: "", description: "", image: "" };
const blankGallery: CmsGalleryItem = { id: "", title: "", type: "Photo", category: "Training", image: "" };
const blankCoach: CmsCoachItem = { id: "", name: "", role: "", experience: "", summary: "", image: "", education: [], highlights: [], certifications: [] };
const blankEvent: CmsEventItem = {
  id: "",
  title: "",
  startDate: "",
  endDate: "",
  time: "",
  venue: "",
  description: "",
  image: "",
  active: true
};

const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange dark:border-white/10 dark:bg-[#181833]";
const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-muted dark:text-white/55";
const linesToArray = (value: FormDataEntryValue | null) => String(value || "").split("\n").map((item) => item.trim()).filter(Boolean);
const arrayToText = (items: string[]) => items.join("\n");
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const safeUploadName = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 54);

  return `${Date.now()}-${baseName || "krsa-image"}.${extension}`;
};

export function AdminContentManager() {
  const { content, ready, saveContent, resetContent } = useCmsContent();
  const [newsForm, setNewsForm] = useState<CmsNewsItem>(blankNews);
  const [achievementForm, setAchievementForm] = useState<CmsAchievementItem>(blankAchievement);
  const [galleryForm, setGalleryForm] = useState<CmsGalleryItem>(blankGallery);
  const [coachForm, setCoachForm] = useState<CmsCoachItem>(blankCoach);
  const [eventForm, setEventForm] = useState<CmsEventItem>(blankEvent);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const showStatus = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 2800);
  };

  const commitContent = async (nextContent: typeof content, message: string) => {
    setIsSaving(true);
    const result = await saveContent(nextContent);
    setIsSaving(false);

    if (result.ok) {
      showStatus(message);
      return true;
    }

    showStatus(result.message || "Saved locally, but could not publish to the live website.");
    return false;
  };

  const confirmDelete = (label: string, title: string, onConfirm: () => void) => {
    if (window.confirm(`Delete ${label}: ${title}?`)) {
      onConfirm();
    }
  };

  const saveNews = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const item = {
      id: newsForm.id || createCmsId(),
      title: String(form.get("title") || ""),
      date: String(form.get("date") || ""),
      image: String(form.get("image") || ""),
      excerpt: String(form.get("excerpt") || "")
    };
    const news = newsForm.id ? content.news.map((entry) => (entry.id === item.id ? item : entry)) : [item, ...content.news];
    if (await commitContent({ ...content, news }, newsForm.id ? "News updated." : "News added.")) {
      setNewsForm(blankNews);
    }
  };

  const saveAchievement = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const item = {
      id: achievementForm.id || createCmsId(),
      title: String(form.get("title") || ""),
      date: String(form.get("date") || ""),
      image: String(form.get("image") || ""),
      description: String(form.get("description") || "")
    };
    const achievements = achievementForm.id
      ? content.achievements.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...content.achievements];
    if (await commitContent({ ...content, achievements }, achievementForm.id ? "Achievement updated." : "Achievement added.")) {
      setAchievementForm(blankAchievement);
    }
  };

  const saveCoach = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const item = {
      id: coachForm.id || createCmsId(),
      name: String(form.get("name") || ""),
      role: String(form.get("role") || ""),
      experience: String(form.get("experience") || ""),
      image: String(form.get("image") || ""),
      summary: String(form.get("summary") || ""),
      education: linesToArray(form.get("education")),
      highlights: linesToArray(form.get("highlights")),
      certifications: linesToArray(form.get("certifications"))
    };
    const coaches = coachForm.id ? content.coaches.map((entry) => (entry.id === item.id ? item : entry)) : [item, ...content.coaches];
    if (await commitContent({ ...content, coaches }, coachForm.id ? "Coach updated." : "Coach added.")) {
      setCoachForm(blankCoach);
    }
  };

  const saveGallery = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const item = {
      id: galleryForm.id || createCmsId(),
      title: String(form.get("title") || ""),
      category: String(form.get("category") || ""),
      type: String(form.get("type") || ""),
      image: String(form.get("image") || "")
    };
    const gallery = galleryForm.id
      ? content.gallery.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...content.gallery];
    if (await commitContent({ ...content, gallery }, galleryForm.id ? "Gallery image updated." : "Gallery image added.")) {
      setGalleryForm(blankGallery);
    }
  };

  const saveEvent = async (event: FormEvent) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const item: CmsEventItem = {
      id: eventForm.id || createCmsId(),
      title: String(form.get("title") || ""),
      startDate: String(form.get("startDate") || ""),
      endDate: String(form.get("endDate") || ""),
      time: String(form.get("time") || ""),
      venue: String(form.get("venue") || ""),
      description: String(form.get("description") || ""),
      image: String(form.get("image") || ""),
      active: form.get("active") === "on"
    };
    const events = eventForm.id
      ? content.events.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...content.events];

    if (await commitContent({ ...content, events }, eventForm.id ? "Event updated." : "Event added.")) {
      setEventForm(blankEvent);
    }
  };

  return (
    <div className="grid gap-8">
      {!ready ? (
        <div className="panel p-5 text-sm font-bold text-muted dark:text-white/60">Loading admin content...</div>
      ) : null}

      {status ? (
        <div className="flex items-center gap-2 rounded-md border border-green/30 bg-green/10 px-4 py-3 text-sm font-bold text-green">
          <CheckCircle2 size={18} /> {status}
        </div>
      ) : null}

      {isSaving ? (
        <div className="rounded-md border border-orange/30 bg-orange/10 px-4 py-3 text-sm font-bold text-orange">
          Publishing website content...
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <SummaryCard icon={CalendarDays} label="Events" value={content.events.length} />
        <SummaryCard icon={Newspaper} label="News" value={content.news.length} />
        <SummaryCard icon={Star} label="Achievements" value={content.achievements.length} />
        <SummaryCard icon={ImageIcon} label="Gallery" value={content.gallery.length} />
        <SummaryCard icon={UserRound} label="Coaches" value={content.coaches.length} />
      </div>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveEvent} className="panel p-5">
          <FormTitle icon={CalendarDays} title={eventForm.id ? "Edit event" : "Add upcoming event"} />
          <Field label="Event title">
            <input
              name="title"
              required
              value={eventForm.title}
              onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })}
              className={inputClass}
              placeholder="Delhi Basketball Championship"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Start date">
              <input
                name="startDate"
                type="date"
                required
                value={eventForm.startDate}
                onChange={(event) => setEventForm({ ...eventForm, startDate: event.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="End date">
              <input
                name="endDate"
                type="date"
                min={eventForm.startDate || undefined}
                value={eventForm.endDate}
                onChange={(event) => setEventForm({ ...eventForm, endDate: event.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Time">
            <input
              name="time"
              value={eventForm.time}
              onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })}
              className={inputClass}
              placeholder="6:00 PM onwards"
            />
          </Field>
          <Field label="Venue">
            <input
              name="venue"
              value={eventForm.venue}
              onChange={(event) => setEventForm({ ...eventForm, venue: event.target.value })}
              className={inputClass}
              placeholder="KRSA, Sangam Vihar, Wazirabad"
            />
          </Field>
          <ImageUploadField
            label="Event poster"
            folder="events"
            value={eventForm.image}
            onChange={(image) => setEventForm({ ...eventForm, image })}
            placeholder="Upload an event poster"
          />
          <Field label="Description">
            <textarea
              name="description"
              value={eventForm.description}
              onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })}
              className={`${inputClass} min-h-24 resize-y`}
            />
          </Field>
          <label className="mb-5 flex items-center gap-3 rounded-md border border-slate-200 px-3 py-3 dark:border-white/10">
            <input
              name="active"
              type="checkbox"
              checked={eventForm.active}
              onChange={(event) => setEventForm({ ...eventForm, active: event.target.checked })}
              className="h-5 w-5 accent-orange"
            />
            <span className="text-sm font-bold text-ink dark:text-white">Show this event as a homepage popup</span>
          </label>
          <FormActions editing={Boolean(eventForm.id)} onCancel={() => setEventForm(blankEvent)} />
        </form>
        <ItemList
          items={content.events}
          empty="No upcoming events added"
          onEdit={setEventForm}
          onDelete={(item) =>
            confirmDelete("event", item.title, () => {
              void commitContent({ ...content, events: content.events.filter((entry) => entry.id !== item.id) }, "Event deleted.");
            })
          }
          getTitle={(item) => item.title}
          getMeta={(item) => `${item.startDate}${item.active ? " · Popup active" : ""}`}
          getImage={(item) => item.image}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveNews} className="panel p-5">
          <FormTitle icon={Newspaper} title={newsForm.id ? "Edit news" : "Add news"} />
          <Field label="Title">
            <input name="title" required value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Date">
            <input name="date" required value={newsForm.date} onChange={(event) => setNewsForm({ ...newsForm, date: event.target.value })} className={inputClass} placeholder="25 May 2026" />
          </Field>
          <ImageUploadField
            label="Image"
            folder="news"
            value={newsForm.image}
            onChange={(image) => setNewsForm({ ...newsForm, image })}
            placeholder="/media/news/photo.jpg"
          />
          <Field label="Excerpt">
            <textarea name="excerpt" required value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} className={`${inputClass} min-h-28 resize-y`} />
          </Field>
          <FormActions editing={Boolean(newsForm.id)} onCancel={() => setNewsForm(blankNews)} />
        </form>
        <ItemList
          items={content.news}
          empty="No news added"
          onEdit={setNewsForm}
          onDelete={(item) =>
            confirmDelete("news", item.title, () => {
              void commitContent({ ...content, news: content.news.filter((entry) => entry.id !== item.id) }, "News deleted.");
            })
          }
          getTitle={(item) => item.title}
          getMeta={(item) => item.date}
          getImage={(item) => item.image}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveCoach} className="panel p-5">
          <FormTitle icon={UserRound} title={coachForm.id ? "Edit coach" : "Add coach"} />
          <Field label="Name">
            <input name="name" required value={coachForm.name} onChange={(event) => setCoachForm({ ...coachForm, name: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Role">
            <input name="role" required value={coachForm.role} onChange={(event) => setCoachForm({ ...coachForm, role: event.target.value })} className={inputClass} placeholder="Head Coach" />
          </Field>
          <Field label="Experience">
            <input name="experience" required value={coachForm.experience} onChange={(event) => setCoachForm({ ...coachForm, experience: event.target.value })} className={inputClass} placeholder="10+ years" />
          </Field>
          <ImageUploadField
            label="Image"
            folder="coaches"
            value={coachForm.image}
            onChange={(image) => setCoachForm({ ...coachForm, image })}
            placeholder="/coaches/name.jpeg"
          />
          <Field label="Summary">
            <textarea name="summary" required value={coachForm.summary} onChange={(event) => setCoachForm({ ...coachForm, summary: event.target.value })} className={`${inputClass} min-h-24 resize-y`} />
          </Field>
          <Field label="Education">
            <textarea name="education" value={arrayToText(coachForm.education)} onChange={(event) => setCoachForm({ ...coachForm, education: linesToArray(event.target.value) })} className={`${inputClass} min-h-28 resize-y`} placeholder="One line per item" />
          </Field>
          <Field label="Highlights">
            <textarea name="highlights" value={arrayToText(coachForm.highlights)} onChange={(event) => setCoachForm({ ...coachForm, highlights: linesToArray(event.target.value) })} className={`${inputClass} min-h-28 resize-y`} placeholder="One line per item" />
          </Field>
          <Field label="Certifications / Awards">
            <textarea name="certifications" value={arrayToText(coachForm.certifications)} onChange={(event) => setCoachForm({ ...coachForm, certifications: linesToArray(event.target.value) })} className={`${inputClass} min-h-24 resize-y`} placeholder="One line per item" />
          </Field>
          <FormActions editing={Boolean(coachForm.id)} onCancel={() => setCoachForm(blankCoach)} />
        </form>
        <ItemList
          items={content.coaches}
          empty="No coaches added"
          onEdit={setCoachForm}
          onDelete={(item) =>
            confirmDelete("coach", item.name, () => {
              void commitContent({ ...content, coaches: content.coaches.filter((entry) => entry.id !== item.id) }, "Coach deleted.");
            })
          }
          getTitle={(item) => item.name}
          getMeta={(item) => item.role}
          getImage={(item) => item.image}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveAchievement} className="panel p-5">
          <FormTitle icon={Star} title={achievementForm.id ? "Edit achievement" : "Add achievement"} />
          <Field label="Title">
            <input name="title" required value={achievementForm.title} onChange={(event) => setAchievementForm({ ...achievementForm, title: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Date / Label">
            <input name="date" required value={achievementForm.date} onChange={(event) => setAchievementForm({ ...achievementForm, date: event.target.value })} className={inputClass} placeholder="2026" />
          </Field>
          <ImageUploadField
            label="Image"
            folder="achievements"
            value={achievementForm.image}
            onChange={(image) => setAchievementForm({ ...achievementForm, image })}
            placeholder="/media/gallery/photo.jpg"
          />
          <Field label="Description">
            <textarea name="description" required value={achievementForm.description} onChange={(event) => setAchievementForm({ ...achievementForm, description: event.target.value })} className={`${inputClass} min-h-28 resize-y`} />
          </Field>
          <FormActions editing={Boolean(achievementForm.id)} onCancel={() => setAchievementForm(blankAchievement)} />
        </form>
        <ItemList
          items={content.achievements}
          empty="No achievements added"
          onEdit={setAchievementForm}
          onDelete={(item) =>
            confirmDelete("achievement", item.title, () => {
              void commitContent({ ...content, achievements: content.achievements.filter((entry) => entry.id !== item.id) }, "Achievement deleted.");
            })
          }
          getTitle={(item) => item.title}
          getMeta={(item) => item.date}
          getImage={(item) => item.image}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveGallery} className="panel p-5">
          <FormTitle icon={ImageIcon} title={galleryForm.id ? "Edit gallery image" : "Add gallery image"} />
          <Field label="Admin title">
            <input name="title" required value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Category">
            <input name="category" required value={galleryForm.category} onChange={(event) => setGalleryForm({ ...galleryForm, category: event.target.value })} className={inputClass} placeholder="Training" />
          </Field>
          <Field label="Type">
            <input name="type" required value={galleryForm.type} onChange={(event) => setGalleryForm({ ...galleryForm, type: event.target.value })} className={inputClass} placeholder="Photo" />
          </Field>
          <ImageUploadField
            label="Image"
            folder="gallery"
            value={galleryForm.image}
            onChange={(image) => setGalleryForm({ ...galleryForm, image })}
            placeholder="/media/gallery/photo.jpg"
          />
          <FormActions editing={Boolean(galleryForm.id)} onCancel={() => setGalleryForm(blankGallery)} />
        </form>
        <ItemList
          items={content.gallery}
          empty="No gallery images added"
          onEdit={setGalleryForm}
          onDelete={(item) =>
            confirmDelete("gallery image", item.title, () => {
              void commitContent({ ...content, gallery: content.gallery.filter((entry) => entry.id !== item.id) }, "Gallery image deleted.");
            })
          }
          getTitle={(item) => item.title}
          getMeta={(item) => item.category}
          getImage={(item) => item.image}
        />
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("Restore the default KRSA website content? This will replace edited events, news, coaches, achievements and gallery records on the live website.")) {
              const result = await resetContent();
              setNewsForm(blankNews);
              setAchievementForm(blankAchievement);
              setGalleryForm(blankGallery);
              setCoachForm(blankCoach);
              setEventForm(blankEvent);
              showStatus(result.ok ? "Default content restored." : result.message || "Defaults restored locally, but live publishing failed.");
            }
          }}
          className="btn-secondary"
        >
          <RotateCcw size={16} /> Restore defaults
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
  return (
    <div className="panel p-5">
      <Icon className="text-orange" />
      <p className="mt-5 font-display text-4xl font-bold text-ink dark:text-white">{value}</p>
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted dark:text-white/60">{label}</p>
    </div>
  );
}

function FormTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange text-white">
        <Icon size={20} />
      </span>
      <h2 className="font-display text-2xl font-bold uppercase text-ink dark:text-white">{title}</h2>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4 grid gap-2">
      <span className={labelClass}>{label}</span>
      {children}
    </div>
  );
}

function ImageUploadField({
  label,
  folder,
  value,
  onChange,
  placeholder
}: {
  label: string;
  folder: "news" | "coaches" | "achievements" | "gallery" | "events";
  value: string;
  onChange: (image: string) => void;
  placeholder: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setError("");
    setProgress(0);

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Upload JPG, PNG or WebP images only.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 8 MB.");
      return;
    }

    setIsUploading(true);

    try {
      const blob = await upload(`cms-media/${folder}/${safeUploadName(file.name)}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: file.size > 4 * 1024 * 1024,
        clientPayload: JSON.stringify({ folder }),
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage))
      });

      onChange(blob.url);
      setProgress(100);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Field label={label}>
      <div className="grid gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            name="image"
            required
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
            placeholder={placeholder}
          />
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold transition hover:border-orange hover:text-orange dark:border-white/10">
            <UploadCloud size={16} />
            {isUploading ? `${progress || 1}%` : "Upload"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleFileChange} />
          </label>
        </div>

        {value ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
            <img src={value} alt="" className="h-full w-full object-contain p-2" />
          </div>
        ) : null}

        {error ? (
          <p className="flex items-center gap-2 text-sm font-bold text-red-600">
            <AlertCircle size={16} /> {error}
          </p>
        ) : null}
      </div>
    </Field>
  );
}

function FormActions({ editing, onCancel }: { editing: boolean; onCancel: () => void }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <button type="submit" className="btn-primary">
        {editing ? <Save size={16} /> : <Plus size={16} />} {editing ? "Save" : "Add"}
      </button>
      {editing ? (
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      ) : null}
    </div>
  );
}

function ItemList<T extends { id: string }>({
  items,
  empty,
  onEdit,
  onDelete,
  getTitle,
  getMeta,
  getImage
}: {
  items: T[];
  empty: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  getTitle: (item: T) => string;
  getMeta: (item: T) => string;
  getImage: (item: T) => string;
}) {
  return (
    <div className="panel overflow-hidden p-0">
      {items.length ? (
        <div className="divide-y divide-slate-200 dark:divide-white/10">
          {items.map((item) => (
            <div key={item.id} className="grid gap-4 p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center">
              <div className="relative h-24 overflow-hidden rounded-md bg-slate-100 dark:bg-white/10">
                <img src={getImage(item)} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display text-xl font-bold uppercase text-ink dark:text-white">{getTitle(item)}</p>
                <p className="mt-1 text-sm font-bold text-orange">{getMeta(item)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => onEdit(item)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold dark:border-white/10">
                  <span className="inline-flex items-center gap-2"><Pencil size={15} /> Edit</span>
                </button>
                <button type="button" onClick={() => onDelete(item)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white">
                  <span className="inline-flex items-center gap-2"><Trash2 size={15} /> Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-sm font-bold text-muted dark:text-white/60">{empty}</div>
      )}
    </div>
  );
}
