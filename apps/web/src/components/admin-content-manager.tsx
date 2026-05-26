"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { ImageIcon, Newspaper, Plus, RotateCcw, Save, Star, Trash2, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CmsAchievementItem,
  CmsCoachItem,
  CmsGalleryItem,
  CmsNewsItem,
  createCmsId,
  useCmsContent
} from "@/lib/cms-content";

const blankNews: CmsNewsItem = { id: "", title: "", date: "", excerpt: "", image: "" };
const blankAchievement: CmsAchievementItem = { id: "", title: "", date: "", description: "", image: "" };
const blankGallery: CmsGalleryItem = { id: "", title: "", type: "Photo", category: "Training", image: "" };
const blankCoach: CmsCoachItem = { id: "", name: "", role: "", experience: "", summary: "", image: "", education: [], highlights: [], certifications: [] };

const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange dark:border-white/10 dark:bg-[#181833]";
const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-muted dark:text-white/55";
const linesToArray = (value: FormDataEntryValue | null) => String(value || "").split("\n").map((item) => item.trim()).filter(Boolean);
const arrayToText = (items: string[]) => items.join("\n");

export function AdminContentManager() {
  const { content, saveContent, resetContent } = useCmsContent();
  const [newsForm, setNewsForm] = useState<CmsNewsItem>(blankNews);
  const [achievementForm, setAchievementForm] = useState<CmsAchievementItem>(blankAchievement);
  const [galleryForm, setGalleryForm] = useState<CmsGalleryItem>(blankGallery);
  const [coachForm, setCoachForm] = useState<CmsCoachItem>(blankCoach);

  const saveNews = (event: FormEvent) => {
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
    saveContent({ ...content, news });
    setNewsForm(blankNews);
  };

  const saveAchievement = (event: FormEvent) => {
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
    saveContent({ ...content, achievements });
    setAchievementForm(blankAchievement);
  };

  const saveCoach = (event: FormEvent) => {
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
    saveContent({ ...content, coaches });
    setCoachForm(blankCoach);
  };

  const saveGallery = (event: FormEvent) => {
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
    saveContent({ ...content, gallery });
    setGalleryForm(blankGallery);
  };

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Newspaper} label="News" value={content.news.length} />
        <SummaryCard icon={Star} label="Achievements" value={content.achievements.length} />
        <SummaryCard icon={ImageIcon} label="Gallery" value={content.gallery.length} />
        <SummaryCard icon={UserRound} label="Coaches" value={content.coaches.length} />
      </div>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <form onSubmit={saveNews} className="panel p-5">
          <FormTitle icon={Newspaper} title={newsForm.id ? "Edit news" : "Add news"} />
          <Field label="Title">
            <input name="title" required value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} className={inputClass} />
          </Field>
          <Field label="Date">
            <input name="date" required value={newsForm.date} onChange={(event) => setNewsForm({ ...newsForm, date: event.target.value })} className={inputClass} placeholder="25 May 2026" />
          </Field>
          <Field label="Image URL / public path">
            <input name="image" required value={newsForm.image} onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })} className={inputClass} placeholder="/media/news/photo.jpg" />
          </Field>
          <Field label="Excerpt">
            <textarea name="excerpt" required value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} className={`${inputClass} min-h-28 resize-y`} />
          </Field>
          <FormActions editing={Boolean(newsForm.id)} onCancel={() => setNewsForm(blankNews)} />
        </form>
        <ItemList
          items={content.news}
          empty="No news added"
          onEdit={setNewsForm}
          onDelete={(id) => saveContent({ ...content, news: content.news.filter((item) => item.id !== id) })}
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
          <Field label="Image URL / public path">
            <input name="image" required value={coachForm.image} onChange={(event) => setCoachForm({ ...coachForm, image: event.target.value })} className={inputClass} placeholder="/coaches/name.jpeg" />
          </Field>
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
          onDelete={(id) => saveContent({ ...content, coaches: content.coaches.filter((item) => item.id !== id) })}
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
          <Field label="Image URL / public path">
            <input name="image" required value={achievementForm.image} onChange={(event) => setAchievementForm({ ...achievementForm, image: event.target.value })} className={inputClass} placeholder="/media/gallery/photo.jpg" />
          </Field>
          <Field label="Description">
            <textarea name="description" required value={achievementForm.description} onChange={(event) => setAchievementForm({ ...achievementForm, description: event.target.value })} className={`${inputClass} min-h-28 resize-y`} />
          </Field>
          <FormActions editing={Boolean(achievementForm.id)} onCancel={() => setAchievementForm(blankAchievement)} />
        </form>
        <ItemList
          items={content.achievements}
          empty="No achievements added"
          onEdit={setAchievementForm}
          onDelete={(id) => saveContent({ ...content, achievements: content.achievements.filter((item) => item.id !== id) })}
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
          <Field label="Image URL / public path">
            <input name="image" required value={galleryForm.image} onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })} className={inputClass} placeholder="/media/gallery/photo.jpg" />
          </Field>
          <FormActions editing={Boolean(galleryForm.id)} onCancel={() => setGalleryForm(blankGallery)} />
        </form>
        <ItemList
          items={content.gallery}
          empty="No gallery images added"
          onEdit={setGalleryForm}
          onDelete={(id) => saveContent({ ...content, gallery: content.gallery.filter((item) => item.id !== id) })}
          getTitle={(item) => item.title}
          getMeta={(item) => item.category}
          getImage={(item) => item.image}
        />
      </section>

      <div className="flex justify-end">
        <button type="button" onClick={resetContent} className="btn-secondary">
          <RotateCcw size={16} /> Reset content
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
    <label className="mb-4 grid gap-2">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
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
  onDelete: (id: string) => void;
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
                  Edit
                </button>
                <button type="button" onClick={() => onDelete(item.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-bold text-white">
                  <Trash2 size={16} />
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
