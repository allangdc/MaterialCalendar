import React from "react";
import Calendar from "../..";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { advanceTo, clear } from "jest-date-mock";
import renderer from "react-test-renderer";

beforeEach(() => {
  render(<Calendar language={"pt"} />);
});

beforeAll(() => {
  advanceTo(new Date(1984, 5, 13));
});

afterAll(() => {
  clear();
});

test("Months must start in current date [current: 1984-06-13]", () => {
  const monthTitle = screen.getByTestId("HeaderTitle");
  expect(monthTitle).toHaveTextContent("Junho 1984");
});

test("Months must decrement when clicked on back button", () => {
  const monthTitle = screen.getByTestId("HeaderTitle");
  const backBtn = screen.getByTestId("btn-back");
  fireEvent.click(backBtn);
  expect(monthTitle).toHaveTextContent("Maio 1984");
});

test("Months must increment when clicked on forward button", () => {
  const monthTitle = screen.getByTestId("HeaderTitle");
  const btn = screen.getByTestId("btn-forward");
  fireEvent.click(btn);
  expect(monthTitle).toHaveTextContent("Julho 1984");
});

test("Today button must change currentDate for Today value", () => {
  const monthTitle = screen.getByTestId("HeaderTitle");
  const btn = screen.getByTestId("btn-forward");
  const btnToday = screen.getByTestId("btn-today");
  // Jump to January 2000
  for (let i = 0; i < 12 * 16 - 5; i++) {
    fireEvent.click(btn);
  }
  expect(monthTitle).toHaveTextContent("Janeiro 2000");
  fireEvent.click(btnToday);
  expect(monthTitle).toHaveTextContent("Junho 1984");
});

test("Snapshot of the Header in monthly view", () => {
  cleanup();
  const component = renderer.create(<Calendar language={"pt"} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
