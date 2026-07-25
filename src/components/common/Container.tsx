import type { ReactNode } from "react";

/** Max-width container used by every section (max-w-5xl + horizontal padding). */
export function Container({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`mx-auto max-w-5xl px-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
