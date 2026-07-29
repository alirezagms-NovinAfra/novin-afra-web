import { Reveal } from "@/components/ui/reveal";
import {
  BadgeDollarSign,
  Calculator,
  GalleryHorizontalEnd,
  ReceiptText,
  Route,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type SectionIcon = "team" | "comparison" | "estimator" | "portfolio" | "pricing" | "costs";

const sectionIcons: Record<SectionIcon, LucideIcon> = {
  team: UsersRound,
  comparison: Route,
  estimator: Calculator,
  portfolio: GalleryHorizontalEnd,
  pricing: BadgeDollarSign,
  costs: ReceiptText,
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  icon: SectionIcon;
}) {
  const Icon = sectionIcons[icon];

  return (
    <Reveal
      className={`section-heading ${align === "start" ? "text-start" : "mx-auto text-center"}`}
    >
      <span className="eyebrow">
        <span className="eyebrow-sticker" aria-hidden="true">
          <Icon size={17} strokeWidth={2.1} />
        </span>
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </Reveal>
  );
}
