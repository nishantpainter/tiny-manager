import React from "react";
import moment from "moment";

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
  return function (innerProps) {
    return <Component {...innerProps} {...props} />;
  };
}

function formatDate(date = new Date(), format = "DD-MM-YYYY") {
  return date && moment(date).format(format);
}

export { join, merge, noop, withProps, formatDate };
