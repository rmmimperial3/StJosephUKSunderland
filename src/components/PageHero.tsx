type PageHeroProps = {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <header className="border-b border-gold/20 bg-wine text-parchment">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="text-xs tracking-[0.22em] text-gold-light uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          {title}
        </h1>
        {children ? (
          <div className="mt-4 max-w-2xl text-base leading-7 text-parchment/85">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
