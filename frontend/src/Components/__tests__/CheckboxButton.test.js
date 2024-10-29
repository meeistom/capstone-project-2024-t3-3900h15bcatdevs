import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { CheckboxButton } from "../CheckboxButton";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render checkbox button", () => {
  render(
    <CheckboxButton
      data-testid="test-checkbox"
      id="test-checkbox"
      name="test-checkbox"
      aria-label="test-checkbox"
      isChecked={true}
      onChange={() => {}}
    >
      Am checked
    </CheckboxButton>
  );
  const checkboxButton = screen.getByRole("checkbox", { name: /am checked/i });

  expect(checkboxButton).toBeInTheDocument();
});

test("should match snapshot when checked", () => {
  const tree = renderer
    .create(
      <CheckboxButton
        data-testid="test-checkbox"
        id="test-checkbox"
        name="test-checkbox"
        aria-label="test-checkbox"
        isChecked={true}
        onChange={() => {}}
      >
        Am unchecked
      </CheckboxButton>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("should match snapshot when unchecked", () => {
  const tree = renderer
    .create(
      <CheckboxButton
        data-testid="test-checkbox"
        id="test-checkbox"
        name="test-checkbox"
        aria-label="test-checkbox"
        isChecked={false}
        onChange={() => {}}
      >
        Not Checked
      </CheckboxButton>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("should pass down children", () => {
  render(
    <CheckboxButton
      data-testid="test-checkbox"
      id="test-checkbox"
      name="test-checkbox"
      aria-label="test-checkbox"
      isChecked={true}
      onChange={() => {}}
    >
      Am checked
    </CheckboxButton>
  );
  const labelText = screen.getByText("Am checked");
  expect(labelText).toBeInTheDocument();
});

test("should handle onClick", async () => {
  const onClick = jest.fn();

  render(
    <CheckboxButton
      data-testid="test-checkbox"
      id="test-checkbox"
      name="test-checkbox"
      aria-label="test-checkbox"
      isChecked={true}
      onChange={onClick}
    >
      Am checked
    </CheckboxButton>
  );
  const checkboxButton = screen.getByRole("checkbox", { name: /am checked/i });
  fireEvent.click(checkboxButton);

  expect(onClick).toHaveBeenCalledTimes(1);
});
