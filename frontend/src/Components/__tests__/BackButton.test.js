import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BackButton } from "../BackButton";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render back button", () => {
  render(<BackButton onClick={null}>Hello</BackButton>);
  const backButton = screen.getByRole("button", { name: "back-button" });

  expect(backButton).toBeInTheDocument();
});

test("should match snapshot", () => {
  const tree = renderer
    .create(<BackButton onClick={null}>Hello</BackButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("should pass down children", () => {
  render(<BackButton onClick={null}>Hello</BackButton>);
  const backButton = screen.getByRole("button", { name: "back-button" });

  expect(backButton).toHaveTextContent("Hello");
});

test("should handle onClick", () => {
  const onClick = jest.fn();

  render(<BackButton onClick={onClick}>Hello</BackButton>);
  const backButton = screen.getByRole("button", { name: "back-button" });

  fireEvent.click(backButton);
  expect(onClick).toHaveBeenCalledTimes(1);
});
