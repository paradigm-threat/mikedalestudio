"use client";

import { site } from "@/content/site";

export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const subject = String(fd.get("subject") || "Website inquiry").trim();
    const message = String(fd.get("message") || "").trim();
    const body = encodeURIComponent(
      name ? `From: ${name}\n\n${message}` : message,
    );
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-border bg-card mt-8 max-w-xl space-y-5 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="border-border bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="border-border bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="border-border bg-background focus:ring-ring w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-accent text-accent-foreground hover:opacity-95 focus:ring-ring rounded-lg px-5 py-2.5 text-sm font-semibold focus:ring-2 focus:outline-none"
      >
        Open email to send
      </button>
      <p className="text-muted-foreground text-xs">
        This opens your email app with a pre-filled message to {site.email}.
      </p>
    </form>
  );
}
