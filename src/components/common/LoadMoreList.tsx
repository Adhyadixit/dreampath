import { useMemo, useState } from "react";

export default function LoadMoreList<T>({
  items,
  renderItem,
  batch = 12,
  className,
}: {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  batch?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(batch);
  const slice = useMemo(() => items.slice(0, visible), [items, visible]);

  return (
    <div className={className}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((item, idx) => (
          <li key={idx}>{renderItem(item, idx)}</li>
        ))}
      </ul>
      {visible < items.length && (
        <button
          type="button"
          className="mt-6 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm shadow-sm hover:shadow transition"
          onClick={() => setVisible((v) => v + batch)}
        >
          Load more
        </button>
      )}
    </div>
  );
}
