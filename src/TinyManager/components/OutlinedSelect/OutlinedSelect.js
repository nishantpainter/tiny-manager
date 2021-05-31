import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function OutlinedSelect(props) {
  const { id, label, value, className, menu, disabled, onChange } = props;

  return (
    <FormControl margin="dense" variant="outlined" className={className}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        margin="dense"
        label={label}
        labelId={id}
        variant="outlined"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {menu.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

OutlinedSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  menu: PropTypes.array,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default OutlinedSelect;
