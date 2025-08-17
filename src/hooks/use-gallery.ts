import React from "react";

export type ImageManifest = Record<string, string[]>;

export function useGallery(category: string) {
  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/images-manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load images manifest");
        const data: ImageManifest = await res.json();
        const list = data[category] || [];
        if (active) setImages(list.map((p) => (p.startsWith("/") ? p : `/${p}`)));
      } catch (e) {
        console.warn("Gallery manifest missing or invalid for", category, e);
        if (active) setImages([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [category]);

  return { images, loading };
}
