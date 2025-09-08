import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export default function CardLite({ title, description, icon, className, children }: Props) {
  return (
    <article
      className={cn(
        "rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-5",
        "shadow-sm hover:shadow transition-shadow",
        className
      )}
    >
      {icon && <div className="mb-3">{icon}</div>}
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && <p className="text-sm text-white/80 mt-1">{description}</p>}
      {children}
    </article>
  );
}
