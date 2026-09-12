type ChurchMarkProps = {
  className?: string;
  title?: string;
};

export function ChurchMark({
  className = "h-11 w-11",
  title = "St Joseph's",
}: ChurchMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" />
      <path
        d="M32 10v44M10 32h44M17.5 17.5l29 29M46.5 17.5l-29 29"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="32" cy="32" r="6" fill="currentColor" />
    </svg>
  );
}
