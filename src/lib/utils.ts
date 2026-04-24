import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names while correctly resolving conflicting utilities.
 * Used by shadcn/ui primitives and throughout the UI layer.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
