import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Classname merger: clsx for conditional logic + tailwind-merge for dedup. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
