import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom tokens, so text-hero is treated as a
// font size (not a color) and rounded-instrument as a radius.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero"],
      radius: ["instrument"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
