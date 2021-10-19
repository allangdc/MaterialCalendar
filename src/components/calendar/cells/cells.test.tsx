import React from "react";
import { render, screen } from "@testing-library/react";
import { hexToRgb } from "@mui/system";
import MonthlyCells from "./MonthlyCells";
import YearlyCells from "./YearlyCells";
import Cells from ".";
import { CalendarContext, CalendarFormat, ICalendarContext } from "..";

const dummyValue: ICalendarContext = {
  formatCal: CalendarFormat.MONTHLY,
  currentDate: new Date(),
  setCurrDate: function (): void {
    throw new Error("Function not implemented.");
  },
  width: undefined,
  setFormatCal: function (): void {
    throw new Error("Function not implemented.");
  },
  language: "",
};

const dateRef = new Date();

test("Must shows YearlyCells", () => {
  dummyValue.formatCal = CalendarFormat.YEARLY;
  render(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={dateRef} />
    </CalendarContext.Provider>
  );
  const linkElement = screen.queryByText(dateRef.getDate());
  expect(linkElement).not.toBeInTheDocument();
});

test("Yearly cells cannot show days", () => {
  render(<YearlyCells day={dateRef} />);
  const linkElement = screen.queryByText(dateRef.getDate());
  expect(linkElement).not.toBeInTheDocument();
});

test("Check days in cells without Children", () => {
  dummyValue.formatCal = CalendarFormat.MONTHLY;
  render(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={dateRef} />
    </CalendarContext.Provider>
  );
  const linkElement = screen.getByText(dateRef.getDate());
  expect(linkElement).toBeInTheDocument();
});

test("Check days in cells with Children", () => {
  render(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={dateRef}>
        <h1>Hello@World</h1>
      </Cells>
    </CalendarContext.Provider>
  );
  const linkDay = screen.getByText(dateRef.getDate());
  const linkChildren = screen.getByText("Hello@World");
  expect(linkDay).toBeInTheDocument();
  expect(linkChildren).toBeInTheDocument();
});

test("background color should be gray for Monthly view", () => {
  const dates = [
    new Date(2021, 0, 2), // sat
    new Date(2021, 0, 3), // sun
  ];
  dates.map((dt) => {
    const rnd = render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = rnd.container.querySelector("#MonthlyView");
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.backgroundColor).toBe(hexToRgb("#F7F6F3"));
    }
  });
});

test("background color should be undefined", () => {
  const dates = [
    new Date(2021, 0, 4), // mon
    new Date(2021, 0, 5), // tue
    new Date(2021, 0, 6), // wed
    new Date(2021, 0, 7), // thu
    new Date(2021, 0, 8), // fri
  ];
  dummyValue.formatCal = CalendarFormat.YEARLY;
  dates.map((dt) => {
    const rnd = render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = rnd.container.querySelector("#YearlyView");
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.backgroundColor).toBe("");
    }
  });

  dummyValue.formatCal = CalendarFormat.MONTHLY;
  dates.map((dt) => {
    const rnd = render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = rnd.container.querySelector("#MonthlyView");
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.backgroundColor).toBe("");
    }
  });
});

test("background color should be orange", () => {
  const dates = [
    new Date(), // today
  ];
  dates.map((dt) => {
    const rnd = render(<MonthlyCells day={dt} />);
    const element = rnd.container.querySelector("#MonthlyView");
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.backgroundColor).toBe(hexToRgb("#F8AD63"));
    }
  });
});
