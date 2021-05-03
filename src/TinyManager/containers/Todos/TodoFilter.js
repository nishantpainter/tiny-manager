import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { FILTERS } from "./index";
import { Translate } from "TinyManager/providers/TranslationProvider";
function TodoFilter(props) {
  const { value, onChange, className } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Select
      size="small"
      margin="dense"
      variant="outlined"
      value={value}
      onChange={handleChange}
      className={className}
    >
      {Object.keys(FILTERS).map((key) => (
        <MenuItem key={FILTERS[key]} value={FILTERS[key]}>
          <Translate>{key}</Translate>
        </MenuItem>
      ))}
    </Select>
  );
}

TodoFilter.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.any,
};

export default TodoFilter;
