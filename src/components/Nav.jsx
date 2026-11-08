import { useEffect, useId, useRef, useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    firstLinkRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-nav">
      <a className="site-nav__brand" href="#home" onClick={() => setOpen(false)}>
        Erik Parra Williams
      </a>
      <button
        ref={toggleRef}
        className="site-nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav aria-label="Primary">
        <ul
          id={menuId}
          className={`site-nav__links${open ? " is-open" : ""}`}
        >
          {links.map((link, index) => (
            <li key={link.id}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
