import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Protect the secret information.
 *
 * @param text information
 * @returns
 */
export function addStarsAndTrim(text: string): string {
  if (text.length <= 10) {
    return "**********";
  }

  const prefix = text.substring(0, 5);
  const suffix = text.substring(text.length - 5);
  const stars = "*".repeat(text.length - 10);

  return `${prefix}${stars}${suffix}`;
}

// Format bytes
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return formattedDate.replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
}
