type PlaceholderCalloutProps = {
  children: React.ReactNode;
};

export function PlaceholderCallout({ children }: PlaceholderCalloutProps) {
  return (
    <aside className="border border-dashed border-gold-dark/50 bg-parchment-deep/50 px-4 py-4 text-sm leading-6 text-ink-muted">
      <p className="mb-1 text-xs font-semibold tracking-[0.16em] text-wine uppercase">
        For the parish to complete
      </p>
      <div>{children}</div>
    </aside>
  );
}
