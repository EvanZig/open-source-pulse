import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-ctp-mantle/95 via-ctp-mantle/90 to-ctp-base/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:-translate-y-1.5 hover:border-ctp-mauve/45 hover:shadow-[0_12px_32px_-8px_rgba(203,166,247,0.18)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn('flex flex-col gap-2 p-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn('text-foreground text-base leading-tight font-semibold', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardProps) {
  return <p className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('p-4 pt-0', className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('flex items-center justify-between p-4 pt-0 text-sm', className)}
      {...props}
    />
  );
}
