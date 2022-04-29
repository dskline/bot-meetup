import React from "react";

import { render } from "@testing-library/react";

import { simpleMock } from "@/features/core/pages/Events/Events.mock";

import Events from ".";

describe("Events", () => {
  it("renders without crashing", () => {
    const { container } = render(<Events events={simpleMock} />);
    expect(container).toBeTruthy();
  });
});
