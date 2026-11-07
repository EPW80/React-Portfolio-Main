import { useState } from "react";
import { useForm } from "@formspree/react";
import { SITE, formspreeFormId } from "../data/site";
import { validateEmail } from "../utils/helpers";

const initialErrors = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [state, handleSubmit, reset] = useForm(formspreeFormId());
  const [fieldErrors, setFieldErrors] = useState(initialErrors);

  const validateField = (name, value) => {
    if (name === "email") {
      return validateEmail(value) ? "" : "Please enter a valid email.";
    }

    return value.trim()
      ? ""
      : `${name[0].toUpperCase()}${name.slice(1)} is required.`;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }));
  };

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const nextErrors = {
      name: validateField("name", String(formData.get("name") || "")),
      email: validateField("email", String(formData.get("email") || "")),
      message: validateField("message", String(formData.get("message") || "")),
    };

    setFieldErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      event.preventDefault();
      return;
    }

    handleSubmit(event);
  };

  if (state.succeeded) {
    return (
      <section id="contact" className="section" data-section>
        <div className="section__head">
          <p className="section__eyebrow">Contact</p>
          <h2 className="section__title">Message received</h2>
        </div>
        <div className="form-success">
          <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => {
              setFieldErrors(initialErrors);
              reset();
            }}
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  const formspreeError =
    state.errors?.getFormErrors?.()?.[0]?.message ||
    (Array.isArray(state.errors) ? state.errors[0]?.message : "");

  return (
    <section id="contact" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">Let&apos;s build something</h2>
        <p className="section__lede">
          Have a role, collaboration, or question? Send a note and I&apos;ll
          reply — or{" "}
          <a href={`mailto:${SITE.email}`}>email {SITE.email}</a>.
        </p>
      </div>
      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            onBlur={handleBlur}
          />
          {fieldErrors.name ? (
            <p id="name-error" className="form-error">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            onBlur={handleBlur}
          />
          {fieldErrors.email ? (
            <p id="email-error" className="form-error">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            onBlur={handleBlur}
          />
          {fieldErrors.message ? (
            <p id="message-error" className="form-error">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
        {formspreeError ? <p className="form-error">{formspreeError}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
  );
}

export default Contact;
