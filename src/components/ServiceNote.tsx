import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { stillNeedsParishText } from "@/lib/content-store";

type ServiceNoteProps = {
  title: string;
  text: string;
  defaultText: string;
};

export function ServiceNote({ title, text, defaultText }: ServiceNoteProps) {
  if (stillNeedsParishText(text, defaultText)) {
    return (
      <PlaceholderCallout>
        <p>
          <strong>{title}.</strong> {text}
        </p>
      </PlaceholderCallout>
    );
  }

  return (
    <section className="border border-gold/30 bg-parchment-card px-4 py-4">
      <h3 className="font-serif text-xl text-wine">{title}</h3>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-muted">{text}</p>
    </section>
  );
}
