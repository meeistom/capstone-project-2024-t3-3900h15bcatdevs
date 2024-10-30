// modal is not seen when closed
// modal is visible when open

import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { Modal } from "../Modal";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render modal", () => {
  render(
    <Modal
      id="test"
      title="Test Modal"
      body={<p>Body</p>}
      footer={<p>Footer</p>}
      closeModal={() => {}}
    />
  );

  expect(screen.getByText("Test Modal")).toBeInTheDocument();
  expect(screen.getByText("Body")).toBeInTheDocument();
  expect(screen.getByText("Footer")).toBeInTheDocument();
});

test("should match snapshot", () => {
  const tree = renderer
    .create(
      <Modal
        id="test"
        title="Test Modal"
        body={<p>Body</p>}
        footer={<p>Footer</p>}
        closeModal={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("should be able to close modal", async () => {
  const closeModalMock = jest.fn();

  render(
    <Modal
      id="test-modal"
      title="Test Title"
      body={<p>Body</p>}
      footer={<p>Footer</p>}
      closeModal={closeModalMock}
    />
  );

  const closeButton = screen.getByRole("button", { name: "close-modal" });

  await userEvent.click(closeButton);

  expect(closeModalMock).toHaveBeenCalledWith(false);
  expect(closeModalMock).toHaveBeenCalledTimes(1);
});

test("should not show title, body or footer if props not given", () => {
  render(<Modal id="test-modal" closeModal={() => {}} />);

  expect(screen.queryByTestId("title")).not.toBeInTheDocument();
  expect(screen.queryByTestId("body")).not.toBeInTheDocument();
  expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
});
