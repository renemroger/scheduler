import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getAllByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //   const { container } = render(<Application />);
  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   // const appointments = getAllByTestId(container, "appointment");
  //   // //click add button
  //   // fireEvent.click(getByAltText(appointments[0], "Add"));
  //   // // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   // fireEvent.change(
  //   //   getByPlaceholderText(appointments[0], /enter student name/i),
  //   //   {
  //   //     target: { value: "Lydia Miller-Jones" }
  //   //   }
  //   // );
  //   // // Click the first interviewer in the list.
  //   // fireEvent.click(getByAltText(appointments[0], "Sylvia Palmer"));
  //   // // Click the "Save" button on that same appointment.
  //   // fireEvent.click(getByText(appointments[0], "Save"));

  //   // console.log(prettyDOM(appointments[0]));
  // });
});
