export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-accent text-accent-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
