import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { NextButton } from "../NextButton";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render next button", () => {
  render(<NextButton onClick={null}>Hello</NextButton>);
  const nextButton = screen.getByRole("button", { name: "next-button" });

  expect(nextButton).toBeInTheDocument();
});

test("should pass down children", () => {
  render(<NextButton onClick={null}>Hello</NextButton>);
  const nextButton = screen.getByRole("button", { name: "next-button" });

  expect(nextButton).toHaveTextContent("Hello");
});

test("should handle onClick", () => {
  const onClick = jest.fn();

  render(<NextButton onClick={onClick}>Hello</NextButton>);
  const nextButton = screen.getByRole("button", { name: "next-button" });

  fireEvent.click(nextButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});
