import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'bg-background/40 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-background h-10 w-full rounded-full border border-white/10 px-10 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
