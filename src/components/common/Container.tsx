import { memo, type ReactNode } from "react";

/** Max-width container used by every section (max-w-5xl + horizontal padding). */
const Container = memo(function Container({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`mx-auto max-w-5xl px-6 ${className}`} {...props}>
      {children}
    </div>
  );
});
Container.displayName = "Container";

export { Container };
