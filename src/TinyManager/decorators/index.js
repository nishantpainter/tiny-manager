import React from "react";

export function wrapper(Story, width = 350) {
  return (
    <div style={{ width }}>
      <Story />
    </div>
  );
}

export function withWrapper(Story) {
  return wrapper(Story);
}

export function withLargeWrapper(Story) {
  return wrapper(Story, 500);
}
