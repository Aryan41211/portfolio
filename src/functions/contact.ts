import { createServerFn } from "@tanstack/react-start";
import { EMAIL } from "@/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

function validateContactData(data: ContactInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name) errors.name = "Name is required";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters";

  if (!email) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address";

  if (!message) errors.message = "Message is required";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters";

  return errors;
}

/**
 * Server function for handling contact form submissions.
 *
 * Currently logs the submission. To send actual emails, integrate
 * an email service (e.g., Resend, SendGrid, Nodemailer) here:
 *
 * import { Resend } from "resend";
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * await resend.emails.send({ from, to, subject, html });
 */
export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => {
    const errors = validateContactData(data);
    if (Object.keys(errors).length > 0) {
      throw new Error(JSON.stringify(errors));
    }
    return {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };
  })
  .handler(async ({ data }) => {
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      message: data.message,
      to: EMAIL,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  });
