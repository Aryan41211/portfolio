import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils";
import type { ForwardRefExoticComponent, RefAttributes, HTMLAttributes } from "react";

/** Tag/badge used for tech stacks and timeline periods — exact class match with premium interactions. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted" | "skill";
}

const variants = {
  default:
    "inline-flex items-center rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors duration-200",
  muted:
    "inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-foreground/40",
  skill:
    "inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-[12px] font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-foreground/40 hover:shadow-sm",
};

export const Badge = ((props: BadgeProps) => {
  const { variant = "default", className, children, ...rest } = props;
  return (
    <span className={cn(variants[variant], className)} {...rest}>
      {children}
    </span>
  );
}) as ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLSpanElement>>;

Badge.displayName = "Badge";

/** Icon-only round button used in Hero social links — exact class match with premium interactions. */
export function IconButton({
  className,
  children,
  ...props
}: HTMLMotionProps<"a">) {
  return (
    <motion.a
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-secondary hover:shadow-sm hover:scale-[1.08] hover:rotate-2 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
