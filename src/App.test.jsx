import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the brand name in the hero", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /erik parra williams/i })
    ).toBeInTheDocument();
  });
});
