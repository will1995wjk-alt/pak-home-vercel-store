type Props = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: Props) {
  return (
    <section className="bg-navy text-white">
      <div className="container py-12 md:py-16">
        <h1 className="text-balance text-3xl font-black md:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/80">{subtitle}</p> : null}
      </div>
    </section>
  );
}
