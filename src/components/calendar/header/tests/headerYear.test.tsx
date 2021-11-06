import React from "react";
import Calendar from "../..";
import { fireEvent, render, screen } from "@testing-library/react";
import { advanceTo, clear } from "jest-date-mock";

beforeEach(() => {
  render(<Calendar language={"pt"} />);
  const toggle = screen.getByTestId("toggle-year");
  fireEvent.click(toggle);
});

beforeAll(() => {
  advanceTo(new Date(1984, 5, 13));
});

afterAll(() => {
  clear();
});

test("Year must start in current date [current: 1984-06-13]", () => {
  const yearTitle = screen.getByTestId("HeaderTitle");
  expect(yearTitle).toHaveTextContent("1984");
});

test("Year must decrement when clicked on back button", () => {
  const yearTitle = screen.getByTestId("HeaderTitle");
  const backBtn = screen.getByTestId("btn-back");
  fireEvent.click(backBtn);
  expect(yearTitle).toHaveTextContent("1983");
});

test("Year must increment when clicked on forward button", () => {
  const yearTitle = screen.getByTestId("HeaderTitle");
  const btn = screen.getByTestId("btn-forward");
  fireEvent.click(btn);
  expect(yearTitle).toHaveTextContent("1985");
});

test("Today button must change currentDate for Today value", () => {
  const yearTitle = screen.getByTestId("HeaderTitle");
  const btn = screen.getByTestId("btn-forward");
  const btnToday = screen.getByTestId("btn-today");
  // Jump to 2000
  for (let i = 0; i < 16; i++) {
    fireEvent.click(btn);
  }
  expect(yearTitle).toHaveTextContent("2000");
  fireEvent.click(btnToday);
  expect(yearTitle).toHaveTextContent("1984");
});
