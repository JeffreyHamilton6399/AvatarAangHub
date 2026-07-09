import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="font-body-aa mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold tracking-wide sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="font-body-aa mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div
      className="mx-auto my-2 h-px w-16"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(201,168,76,0.45), transparent)",
      }}
    />
  );
}
