export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-ink dark:text-white md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted dark:text-white/60">{copy}</p> : null}
    </div>
  );
}
