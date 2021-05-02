import React from "react";

function join(...strings) {
  return strings.join("");
}

// eslint-disable-next-line no-unused-vars
function withProps(Component, props) {
  // eslint-disable-next-line react/display-name
  return function ($props) {
    return <Component {...$props} {...props} />;
  };
}

export { join, withProps };
