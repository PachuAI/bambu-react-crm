import { cleanup,render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach,describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("<Button />", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-neutral-200", "text-neutral-900");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole("button", { name: "Clickable" }));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});