import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Tailwind aspect class, e.g. aspect-[3/4] for portrait hero */
  aspectClassName?: string;
};

export function PortfolioImage({
  src,
  alt,
  priority,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectClassName = "aspect-[4/3]",
}: Props) {
  const isGif = src.toLowerCase().endsWith(".gif");
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-muted",
        aspectClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
        unoptimized={isGif}
      />
    </div>
  );
}
