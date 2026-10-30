import { useState } from "react";
import { useForm } from "@formspree/react";
import { validateEmail } from "../utils/helpers";

function Contact() {
  const [state, handleSubmit] = useForm("xknyyydk");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setErrorMessage(validateEmail(value) ? "" : "Please enter a valid email.");
      return;
    }

    setErrorMessage(value.trim() ? "" : `${name[0].toUpperCase()}${name.slice(1)} is required.`);
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
            onClick={() => window.location.reload()}
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section" data-section>
      <div className="section__head">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">Let&apos;s build something</h2>
        <p className="section__lede">
          Have a role, collaboration, or question? Send a note and I&apos;ll
          reply — or{" "}
          <a href="mailto:erikparrawilliams@tutanota.com">
            email erikparrawilliams@tutanota.com
          </a>
          .
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required onBlur={handleBlur} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required onBlur={handleBlur} />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required onBlur={handleBlur} />
        </div>
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
  );
}

export default Contact;
