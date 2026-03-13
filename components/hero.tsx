type HeroProps = {
  title: string;
  subtitle?: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="shell relative pb-6 pt-10 sm:pt-12">
      <div className="relative">
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-purple">
            Nghiên cứu Công giáo
          </span>
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
            Bản học thuật
          </span>
        </div>

        <h1 className="max-w-6xl font-sans text-4xl font-semibold leading-tight tracking-[-0.03em] text-zinc-950 md:text-6xl">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-700 md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
