import { memo, type ReactNode } from "react";
import { Container } from "./Container";

/**
 * Standard section wrapper.
 *
 * Every numbered section shares:
 * - scroll-mt-24 (offset for fixed navbar)
 * - py-32 md:py-40 (vertical rhythm)
 * - Container inside
 */
const Section = memo(function Section({
  id,
  children,
  className = "",
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  id: string;
  children: ReactNode;
  size?: "default" | "compact";
}) {
  const padding = size === "compact" ? "py-16 md:py-24" : "py-20 md:py-28";

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${padding} ${className}`}
      aria-labelledby={`${id}-heading`}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
});
Section.displayName = "Section";

export { Section };
