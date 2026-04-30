import { cn } from '@/lib/utils';

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div className={cn('relative h-11 w-11 shrink-0', className)} aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full"
        role="img"
        focusable="false"
      >
        <defs>
          <linearGradient id="logo-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="48%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="logo-gloss" cx="0.2" cy="0.1" r="0.9">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <linearGradient id="logo-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#cffafe" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="58" height="58" rx="18" fill="url(#logo-base)" />
        <rect x="3" y="3" width="58" height="58" rx="18" fill="url(#logo-gloss)" />
        <path
          d="M14 26c4-8 14-14 26-12 6 1 11 4 14 8"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 38c-4 8-14 14-26 12-6-1-11-4-14-8"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 36H24L30 22L36 44L42 30H54"
          stroke="url(#logo-pulse)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="24" cy="36" r="3" fill="rgba(255, 255, 255, 0.85)" />
        <circle cx="42" cy="30" r="2.4" fill="rgba(255, 255, 255, 0.75)" />
      </svg>
    </div>
  );
}
