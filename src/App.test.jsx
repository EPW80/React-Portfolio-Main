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

  it("lists featured projects with repository links", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /repository/i })).toHaveLength(
      projects.length
    );
    expect(screen.getByRole("heading", { name: /tuffle/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /faucet/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /social clone/i })
    ).toBeInTheDocument();
  });

  it("hides live CTAs when demos are offline", () => {
    render(<App />);
    const liveCount = projects.filter((project) => project.live).length;
    expect(
      screen.getAllByRole("link", { name: "Live site" })
    ).toHaveLength(liveCount);
    expect(screen.getAllByText(/demo offline/i)).toHaveLength(
      projects.length - liveCount
    );
  });

  it("shows contact validation when email is invalid", async () => {
    const user = userEvent.setup();
    render(<App />);

    const email = screen.getByLabelText(/email/i);
    await user.type(email, "not-an-email");
    await user.tab();

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows resume highlights and linkedin footer link", () => {
    render(<App />);
    expect(
      screen.getByText(/full stack web development — ucla coding boot camp/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/erik-parra-williams/"
    );
  });
});
