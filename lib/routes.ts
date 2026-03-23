/** Internal app routes — used for nav and eager prefetch. */
export const NAV_ROUTES = [
  { href: "/", label: "Home" },
  { href: "/graphic-design", label: "Graphic Design" },
  { href: "/printmaking", label: "Printmaking" },
  { href: "/illustration", label: "Illustration" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const PREFETCH_PATHS = NAV_ROUTES.map((r) => r.href);
