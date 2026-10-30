import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

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

  it("lists project repository and live links", () => {
    render(<App />);
    expect(screen.getAllByRole("link", { name: /repository/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /live site/i }).length).toBeGreaterThan(0);
  });

  it("shows contact validation when email is invalid", async () => {
    const user = userEvent.setup();
    render(<App />);

    const email = screen.getByLabelText(/email/i);
    await user.type(email, "not-an-email");
    await user.tab();

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });
});
