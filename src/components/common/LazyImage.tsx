import { useRef } from "react";
import { useInView } from "framer-motion";

export type LazyImageProps = JSX.IntrinsicElements["img"] & {
  lowSrc?: string;
};

export default function LazyImage({ src, lowSrc, alt, ...rest }: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <img
      ref={ref}
      src={inView ? (src as string) : lowSrc || (src as string)}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
