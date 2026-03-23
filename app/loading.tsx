export default function Loading() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="bg-muted h-10 max-w-xs animate-pulse rounded-lg" />
      <div className="bg-muted mt-8 h-64 w-full max-w-2xl animate-pulse rounded-2xl" />
      <div className="bg-muted mt-6 h-4 max-w-2xl animate-pulse rounded" />
      <div className="bg-muted mt-3 h-4 max-w-xl animate-pulse rounded" />
    </div>
  );
}
