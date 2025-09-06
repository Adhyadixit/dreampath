import React from "react";

export type LazySectionProps = {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  /** CSS min-height to avoid layout shift for big sections */
  minHeightClassName?: string;
  /** Observe threshold (0..1). Default 0.15 */
  threshold?: number;
  /** Root margin for preloading. Default "0px 0px -10% 0px" */
  rootMargin?: string;
  /** If true, stops observing after the first reveal. Default true */
  once?: boolean;
  className?: string;
};

/**
 * LazySection mounts its children only when it comes into the viewport.
 * Useful for deferring expensive components and assets.
 */
const LazySection: React.FC<LazySectionProps> = ({
  children,
  placeholder,
  minHeightClassName,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not supported, render immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        children
      ) : (
        placeholder ?? (
          <div className={minHeightClassName} aria-hidden>
            {/* Lightweight placeholder to avoid layout shifts */}
          </div>
        )
      )}
    </div>
  );
};

export default LazySection;
