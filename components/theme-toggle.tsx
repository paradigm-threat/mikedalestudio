import dynamic from "next/dynamic";

const ThemeToggleInner = dynamic(() => import("@/components/theme-toggle-inner"), {
  ssr: false,
  loading: () => (
    <span
      className="border-border inline-flex h-10 w-10 rounded-lg border"
      aria-hidden
    />
  ),
});

export function ThemeToggle() {
  return <ThemeToggleInner />;
}
