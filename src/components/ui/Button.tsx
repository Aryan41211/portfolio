import { motion, type HTMLMotionProps } from "framer-motion";
import { Children, isValidElement, type ReactElement } from "react";
import { cn } from "@/utils";
import type { AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-brand text-brand-foreground hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--brand)] active:opacity-100",
  secondary:
    "border border-border bg-card text-foreground hover:border-brand-subtle hover:bg-secondary hover:shadow-sm active:bg-muted",
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
  const classes = cn(base, variants[variant], sizes[size], className);

  // `asChild` was previously accepted and ignored, so every call site rendered
  // <button><a/></button> — interactive content nested inside interactive
  // content, which is invalid HTML, produces two tab stops for one control,
  // and painted the pill background twice. Merge onto the child instead.
  if (asChild) {
    const child = Children.only(children) as ReactElement<Record<string, unknown>>;
    if (isValidElement(child)) {
      const { className: childClassName, children: childChildren, ...childProps } = child.props;
      return (
        <motion.a
          {...(childProps as HTMLMotionProps<"a">)}
          {...(rest as HTMLMotionProps<"a">)}
          className={cn(classes, childClassName as string)}
        >
          {childChildren as React.ReactNode}
        </motion.a>
      );
    }
  }

  return (
    <motion.button className={classes} {...rest}>
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
