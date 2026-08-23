import { useState } from "react";
import { Check, Copy, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { Button } from "@/components/ui";
import { GithubIcon, LinkedinIcon } from "@/components/common";
import { EMAIL, SOCIALS, PROFILE } from "@/data";
import { BUTTON_PRESS } from "@/constants";
import { useCopyToClipboard } from "@/hooks";
import { submitContactForm } from "@/functions/contact";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!message) {
    errors.message = "Message is required";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

export function Contact() {
  const [copied, copy] = useCopyToClipboard();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleCopy = () => copy(EMAIL);

  const handleChange = (field: keyof FormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => {
        const next = { ...prev };
        if (fieldErrors[field]) {
          next[field] = fieldErrors[field];
        } else {
          delete next[field];
        }
        return next;
      });
    }
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const next = { ...prev };
      const fieldErrors = validate(formData);
      if (fieldErrors[field]) {
        next[field] = fieldErrors[field];
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const allErrors = validate(formData);
  const isValid = Object.keys(allErrors).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) return;
    if (status === "loading") return;

    setStatus("loading");
    try {
      await submitContactForm({ data: formData });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      try {
        const serverErrors = JSON.parse(msg);
        setErrors(serverErrors);
        setTouched({ name: true, email: true, message: true });
      } catch {
        // Not JSON — generic error
      }
      setStatus("error");
    }
  };

  const inputClasses = (field: keyof FormData) =>
    `w-full rounded-2xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors[field] && touched[field] ? "border-red-500/60" : "border-border"}`;

  const labelClasses = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <Section id="contact">
      <SectionHeader id="contact" />

      <Reveal>
        <div className="rounded-[2rem] border border-border bg-card p-8 md:p-12">
          <h3 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl leading-tight">
            {PROFILE.contactHeadline[0]}
            <br />
            <span className="text-brand">{PROFILE.contactHeadline[1]}</span>
          </h3>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg leading-relaxed">
            {PROFILE.contactParagraph}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Contact actions"
          >
            <a
              href={`mailto:${EMAIL}`}
              title={`Send email to ${EMAIL}`}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-all duration-200 hover:opacity-90 hover:shadow-[0_10px_28px_-12px_var(--brand)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{EMAIL}</span>
            </a>
            <Button
              variant="ghost"
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              aria-live="polite"
              whileHover={{ y: -2 }}
              whileTap={BUTTON_PRESS}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-12">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClasses}>
                  Name{" "}
                  <span className="text-red-500/70" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={inputClasses("name")}
                  aria-required="true"
                  aria-invalid={!!errors.name && touched.name}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                  autoComplete="name"
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClasses}>
                  Email{" "}
                  <span className="text-red-500/70" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClasses("email")}
                  aria-required="true"
                  aria-invalid={!!errors.email && touched.email}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message" className={labelClasses}>
                Message{" "}
                <span className="text-red-500/70" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                className={`${inputClasses("message")} resize-y min-h-[100px]`}
                aria-required="true"
                aria-invalid={!!errors.message && touched.message}
                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
              />
              {errors.message && touched.message && (
                <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid || status === "loading"}
                whileHover={isValid && status !== "loading" ? { y: -2 } : undefined}
                whileTap={isValid && status !== "loading" ? BUTTON_PRESS : undefined}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>
              {status === "success" && (
                <p className="text-sm text-green-600" role="status">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>

          <div className="mt-12 grid gap-4 border-t border-border pt-10 md:grid-cols-3">
            {SOCIALS.map((social) => {
              const Icon = social.id === "github" ? GithubIcon : LinkedinIcon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={`${social.label} \u2014 ${social.handle}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-subtle hover:bg-brand-muted hover:shadow-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {social.id === "github" ? "GitHub" : "LinkedIn"}
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">
                      {social.handle}
                    </div>
                  </div>
                </a>
              );
            })}
            <div className="flex items-center gap-3 rounded-2xl border border-border p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
              <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Location
                </div>
                <div className="truncate text-sm font-medium text-foreground">
                  {PROFILE.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
