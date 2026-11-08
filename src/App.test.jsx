import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { education, projects } from "./data/content";
import { SITE, resumePdfHref } from "./data/site";
import { validateEmail } from "./utils/helpers";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the brand name in the hero", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: new RegExp(SITE.name, "i") })
    ).toBeInTheDocument();
  });

  it("exposes primary section landmarks", () => {
    render(<App />);
    expect(document.getElementById("home")).toBeTruthy();
    expect(document.getElementById("work")).toBeTruthy();
    expect(document.getElementById("about")).toBeTruthy();
    expect(document.getElementById("resume")).toBeTruthy();
    expect(document.getElementById("contact")).toBeTruthy();
  });

  it("lists featured projects with repository and live links from data", () => {
    render(<App />);
    const repoCount = projects.filter((project) => project.repo).length;
    const liveCount = projects.filter((project) => project.live).length;

    expect(screen.getAllByRole("link", { name: /repository/i })).toHaveLength(
      repoCount
    );
    expect(screen.getAllByRole("link", { name: /live site/i })).toHaveLength(
      liveCount * 2
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    for (const link of screen.getAllByRole("link", { name: "About" })) {
      expect(link).toHaveAttribute("href", "#about");
    }
    expect(
      screen.getAllByRole("link").some((link) => link.getAttribute("href") === "/work")
    ).toBe(false);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { name: project.title })
      ).toBeInTheDocument();
    }

    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
  });

  it("links resume downloads to the shared PDF path", () => {
    render(<App />);
    const pdfHref = resumePdfHref();
    const resumeLinks = screen.getAllByRole("link", {
      name: /download (resume|pdf)/i,
    });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of resumeLinks) {
      expect(link).toHaveAttribute("href", pdfHref);
    }
  });

  it("shows contact validation when email is invalid", async () => {
    const user = userEvent.setup();
    render(<App />);

    const email = screen.getByRole("textbox", { name: "Email" });
    await user.type(email, "not-an-email");
    await user.tab();

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows resume experience, education, and linkedin footer link", () => {
    render(<App />);
    expect(screen.getByText(/house of helix llc/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(
        new RegExp(education[0].detail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      )
    ).toHaveLength(2);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      SITE.linkedInUrl
    );
  });
});

describe("validateEmail", () => {
  it("accepts simple valid addresses and rejects incomplete ones", () => {
    expect(validateEmail("erik@example.com")).toBe(true);
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
  });
});
