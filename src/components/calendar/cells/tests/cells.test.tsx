import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { hexToRgb } from "@mui/system";
import MonthlyCells from "../MonthlyCells";
import YearlyCells from "../YearlyCells";
import Cells from "..";
import { CalendarContext, CalendarFormat, ICalendarContext } from "../..";
import {
  addDays,
  endOfMonth,
  startOfMonth,
  startOfToday,
  subDays,
} from "date-fns";
import renderer from "react-test-renderer";

const dateRef = startOfToday();

const dummyValue: ICalendarContext = {
  formatCal: CalendarFormat.MONTHLY,
  currDate: dateRef,
  setCurrDate: function (): void {
    throw new Error("Function not implemented.");
  },
  width: undefined,
  setFormatCal: function (): void {
    throw new Error("Function not implemented.");
  },
  language: "",
  holidays: undefined,
  holidayColor: undefined,
  lineColor: undefined,
  dataArray: [],
  setDataArray: function (): void {
    throw new Error("Function not implemented.");
  },
  headerArray: [],
  setHeaderArray: function (): void {
    throw new Error("Function not implemented.");
  },
  sameWidthP100: undefined,
};

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

test("Background color for weekend days should be gray for Monthly view", () => {
  const dates = [
    new Date(2021, 0, 2), // sat
    new Date(2021, 0, 3), // sun
  ];
  dates.map((dt) => {
    cleanup();
    render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = screen.getByTestId("MonthlyView");
    const styles = getComputedStyle(element);
    expect(styles.backgroundColor).toBe(hexToRgb("#F7F6F3"));
  });
});

test("Background color for normal days should be undefined", () => {
  const dates = [
    new Date(2021, 0, 4), // mon
    new Date(2021, 0, 5), // tue
    new Date(2021, 0, 6), // wed
    new Date(2021, 0, 7), // thu
    new Date(2021, 0, 8), // fri
  ];
  dummyValue.formatCal = CalendarFormat.YEARLY;
  dates.map((dt) => {
    cleanup();
    render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = screen.getByTestId("YearlyView");
    const styles = getComputedStyle(element);
    expect(styles.backgroundColor).toBe("");
  });

  dummyValue.formatCal = CalendarFormat.MONTHLY;
  dates.map((dt) => {
    cleanup();
    render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = screen.getByTestId("MonthlyView");
    const styles = getComputedStyle(element);
    expect(styles.backgroundColor).toBe("");
  });
});

test("Background color for today should be orange in monthly view", () => {
  const dt = dateRef; // today
  render(<MonthlyCells day={dt} />);
  const element = screen.getByTestId("MonthlyView");
  const styles = getComputedStyle(element);
  expect(styles.backgroundColor).toBe(hexToRgb("#F8AD63"));
});

test("Background color for current month should be orange in yearly view", () => {
  const dt = dateRef; // today
  dummyValue.formatCal = CalendarFormat.YEARLY;
  render(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={dt} />
    </CalendarContext.Provider>
  );
  const element = screen.getByTestId("YearlyView");
  const styles = getComputedStyle(element);
  expect(styles.backgroundColor).toBe(hexToRgb("#F8AD63"));
});

test("Textcolor for days in current month must be gray in Monthly view", () => {
  dummyValue.formatCal = CalendarFormat.MONTHLY;
  const dtinit = startOfMonth(dateRef); // same month of today
  const dtend = endOfMonth(dateRef); // same month of today
  const dates = [dtinit, dtend];
  dates.map((dt) => {
    cleanup();
    render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = screen.queryByText(dt.getDate());
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.color).toBe("gray");
    }
  });
});

test("Textcolor for days out current month must be lightgray in Monthly view", () => {
  dummyValue.formatCal = CalendarFormat.MONTHLY;
  const dtinit = subDays(startOfMonth(dateRef), 1); // before month of today
  const dtend = addDays(endOfMonth(dateRef), 1); // after same month of today
  const dates = [dtinit, dtend];
  dates.map((dt) => {
    cleanup();
    render(
      <CalendarContext.Provider value={dummyValue}>
        <Cells day={dt} />
      </CalendarContext.Provider>
    );
    const element = screen.queryByText(dt.getDate());
    expect(element).toBeInTheDocument();
    if (element) {
      const styles = getComputedStyle(element);
      expect(styles.color).toBe("ThreeDHighlight");
    }
  });
});

test("Day must be align on the right side of the cell in monthly view", () => {
  const dt = dateRef; // today
  dummyValue.formatCal = CalendarFormat.MONTHLY;
  render(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={dt} />
    </CalendarContext.Provider>
  );
  const element = screen.getByText(dt.getDate());
  expect(element).toBeInTheDocument();
  if (element) {
    const styles = getComputedStyle(element);
    expect(styles.textAlign).toBe("right");
  }
});

test("Snapshot of the cells in monthly view", () => {
  dummyValue.formatCal = CalendarFormat.MONTHLY;
  const myDate = new Date(1984, 5, 13);
  const component = renderer.create(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={myDate} />
    </CalendarContext.Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Snapshot of the cells in yearly view", () => {
  dummyValue.formatCal = CalendarFormat.YEARLY;
  const myDate = new Date(1984, 5, 13);
  const component = renderer.create(
    <CalendarContext.Provider value={dummyValue}>
      <Cells day={myDate} />
    </CalendarContext.Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
