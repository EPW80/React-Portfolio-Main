import { useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <a className="site-nav__brand" href="#home" onClick={() => setOpen(false)}>
        Erik Parra Williams
      </a>
      <button
        className="site-nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      <ul
        id="site-nav-links"
        className={`site-nav__links${open ? " is-open" : ""}`}
      >
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Nav;
