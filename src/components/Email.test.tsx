import React from "react";
import { render } from "@testing-library/react";
import Email from "./Email";

describe("Email", () => {
  it("should decode and display email with 2 dots", () => {
    const { getByText } = render(
      <Email email="franck(dot)ernewein(at)gmail(dot)com" />
    );
    expect(getByText("franck.ernewein@gmail.com")).toBeInTheDocument();
  });
});
