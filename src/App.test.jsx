import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";
import { projects } from "./data/projects";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the brand name in the hero", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /erik parra williams/i })
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

  it("lists featured projects with repository links where available", () => {
    render(<App />);
    const repoCount = projects.filter((project) => project.repo).length;
    expect(screen.getAllByRole("link", { name: /repository/i })).toHaveLength(
      repoCount
    );
    expect(
      screen.getByRole("heading", { name: /chat analytics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /agentflow/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sugarmenu/i })
    ).toBeInTheDocument();
  });

  it("hides live CTAs when demos are offline and shows status labels", () => {
    render(<App />);
    const liveCount = projects.filter((project) => project.live).length;
    expect(screen.getAllByRole("link", { name: "Live site" })).toHaveLength(
      liveCount
    );
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getAllByText(/demo offline/i).length).toBeGreaterThan(0);
  });

  it("shows contact validation when email is invalid", async () => {
    const user = userEvent.setup();
    render(<App />);

    const email = screen.getByLabelText(/email/i);
    await user.type(email, "not-an-email");
    await user.tab();

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows resume experience, education, and linkedin footer link", () => {
    render(<App />);
    expect(screen.getByText(/house of helix llc/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /b\.s\. computer science — california state university, fullerton \(jan 2026\)/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/erikparrawilliams"
    );
  });
});
