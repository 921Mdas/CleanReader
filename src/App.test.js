import {
  screen,
  render,
  container,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  /* eslint-disable*/
  render(<App />);
});

describe("the layout must appear correctly", () => {
  test("header must appear properly", () => {
    const logo = screen.getByText(/cleanreader/i);
    const gitHubLink = screen.getByRole("link", { name: /star on github/i });
    const navbar = screen.getByTestId("navbar");
    [logo, gitHubLink, navbar].forEach(testEl => {
      expect(testEl).toBeInTheDocument();
    });
  });
  test("body of the application must appear side to side", () => {
    const uploadSection = screen.getByTestId("upload_section");
    expect(uploadSection).toBeInTheDocument();
  });
});
// make sure the event matches what the application is doing.
// make sure if you are simulating uploading a file or receiving data that you do the same here
describe("upload section", () => {
  test("upload button must upload a csv file correctly correctly", async () => {
    const label = screen.getByTestId("input_label");
    const testFile = new File(["one", "two"], "hello.csv", { type: "csv" });
    const inputSection = screen.getByTestId("input_upload");
    const preUploadText = screen.getByText(/Upload your file/i);
    expect(label).toBeInTheDocument();
    expect(preUploadText).toBeInTheDocument();
    userEvent.upload(inputSection, testFile);
    const postUploadText = screen.getByText(/File uploaded/i);
    expect(postUploadText).toBeInTheDocument();
    expect(inputSection.files[0]).toStrictEqual(testFile);
    expect(inputSection.files).toHaveLength(1);
  });

  test("drag and drop section must upload a csv file", async () => {
    const dragEl = screen.getByTestId("dragzone_id");
    const dataText = screen.queryByText(/before/i);
    const onDrop = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDragOver = jest.fn();
    render(
      <div
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
      />
    );
    const testFile = new File(["one", "two"], "hello.csv", { type: "csv" });
    expect(dragEl).toBeInTheDocument();
    await fireEvent.drop(dragEl, {
      dataTransfer: {
        files: testFile,
      },
    });
    expect(dataText).toBeInTheDocument();
  });
});

describe("test network and api calls", () => {
  test("the component appears correctly", async () => {
    const api = screen.getByTestId("api_content");
    expect(api).toBeInTheDocument();

    await waitFor(() => {
      const data = screen.getAllByText("Sonatra");
      expect(data).toBeTruthy();
    });
  });
});

describe("testing the output sections", () => {
  test("adding a delimiter checkbox", async () => {
    const addDelimiter = jest.fn();
    render(<input type={"checkbox"} onChange={addDelimiter()} />);
    const checkbox = screen.getByLabelText(/Add comma delimiter/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await waitFor(() => {
      fireEvent.change(checkbox);
      expect(addDelimiter).toHaveBeenCalledTimes(1);
    });
  });
});
