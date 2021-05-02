import React from "react";

function join(...strings) {
  return strings.join("");
}

function merge(...objects) {
  return objects.reduce(
    (accumulator, object) => ({ ...accumulator, ...object }),
    {}
  );
}

function noop() {
  /* No Action */
}

// eslint-disable-next-line no-unused-vars
function withProps(Component, props) {
  // eslint-disable-next-line react/display-name
  return function ($props) {
    return <Component {...$props} {...props} />;
  };
}

export { join, merge, noop, withProps };
