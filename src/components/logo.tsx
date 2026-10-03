import { cn } from "@/lib/utils";

export function LampMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <circle cx="16" cy="16" r="14.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        fill="currentColor"
        d="M16 7.2c.32 0 .58.22.68.52 1.25 3.05 4.32 6.18 4.32 9.48a5 5 0 1 1-10 0c0-3.3 3.07-6.43 4.32-9.48.1-.3.36-.52.68-.52Z"
      />
      <circle cx="16" cy="19.6" r="1.7" fill="var(--color-background)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-lg font-medium tracking-tight italic", className)}>
      Lume
    </span>
  );
}
