import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="font-display text-foreground text-4xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        That page doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="bg-accent text-accent-foreground focus:ring-ring mt-8 rounded-lg px-5 py-2.5 text-sm font-semibold focus:ring-2 focus:outline-none"
      >
        Back home
      </Link>
    </div>
  );
}
