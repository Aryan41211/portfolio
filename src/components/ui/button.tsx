import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils";
import type { AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-foreground text-background hover:opacity-90 hover:shadow-lg active:opacity-100",
  secondary:
    "border border-border bg-card text-foreground hover:bg-secondary hover:shadow-sm active:bg-muted",
  ghost:
    "border border-border bg-card text-foreground hover:bg-secondary hover:shadow-sm active:bg-muted",
};

const sizes: Record<string, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-[13px]",
  md: "h-11 px-5 text-sm",
  icon: "h-11 w-11",
};

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "md" | "icon";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  asChild,
  ...rest
}: ButtonProps) {
  return (
    <motion.button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </motion.button>
  );
}

Button.displayName = "Button";

export function ResumeButton({
  children = "Download Resume",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) {
  return (
    <a
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
