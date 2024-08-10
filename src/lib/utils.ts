import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Protect the secret information.
 *
 * @param text information
 * @returns
 */
export function addStarsAndTrim(text: string): string {
  if (text.length <= 10) {
    return '**********';
  }

  const prefix = text.substring(0, 5);
  const suffix = text.substring(text.length - 5);
  const stars = '*'.repeat(text.length - 10);

  return `${prefix}${stars}${suffix}`;
}
