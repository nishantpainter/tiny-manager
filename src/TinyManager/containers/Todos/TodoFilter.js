import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { FILTERS } from "./index";
import { Translate } from "TinyManager/providers/TranslationProvider";
import { FormControl, InputLabel } from "@material-ui/core";
function TodoFilter(props) {
  const { value, className, onChange, translate } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl margin="dense" variant="outlined">
      <InputLabel id="todo-filter-by">{translate("Filter By")}</InputLabel>
      <Select
        label={translate("Filter By")}
        labelId="todo-filter-by"
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
    </FormControl>
  );
}

TodoFilter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  translate: PropTypes.func,
};

export default TodoFilter;
