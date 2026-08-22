import { useId } from 'react';

import { cn } from '@/lib/utils';

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const uid = useId();
  const borderId = `logo-border-${uid}`;
  const pulseId = `logo-pulse-${uid}`;
  const glowId = `node-glow-${uid}`;

  return (
    <div className={cn('relative h-11 w-11 shrink-0', className)} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-full w-full" role="img" focusable="false">
        <defs>
          <linearGradient id={borderId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6e3a1" />
            <stop offset="50%" stopColor="#94e2d5" />
            <stop offset="100%" stopColor="#cba6f7" />
          </linearGradient>

          <linearGradient id={pulseId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94e2d5" />
            <stop offset="50%" stopColor="#fab387" />
            <stop offset="100%" stopColor="#cba6f7" />
          </linearGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="#11111b"
          stroke={`url(#${borderId})`}
          strokeWidth="2"
        />
        <rect x="3" y="3" width="58" height="58" rx="15" fill="rgba(255, 255, 255, 0.02)" />

        <line
          x1="10"
          y1="32"
          x2="54"
          y2="32"
          stroke="#313244"
          strokeWidth="2.5"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />

        <path
          d="M 16 32 C 22 32, 22 14, 28 14 C 34 14, 34 50, 40 50 C 46 50, 46 32, 52 32"
          stroke={`url(#${pulseId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        <circle cx="10" cy="32" r="2" fill="#bac2de" />
        <circle cx="16" cy="32" r="3.5" fill="#89dceb" stroke="#11111b" strokeWidth="1.2" />
        <circle
          cx="28"
          cy="14"
          r="5"
          fill="#cba6f7"
          stroke="#11111b"
          strokeWidth="1.5"
          filter={`url(#${glowId})`}
        />
        <circle
          cx="40"
          cy="50"
          r="5"
          fill="#94e2d5"
          stroke="#11111b"
          strokeWidth="1.5"
          filter={`url(#${glowId})`}
        />
        <circle cx="52" cy="32" r="3.5" fill="#89dceb" stroke="#11111b" strokeWidth="1.2" />
        <circle cx="54" cy="32" r="2" fill="#bac2de" />
      </svg>
    </div>
  );
}
