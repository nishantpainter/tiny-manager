import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "TinyManager/components/IconButton";

function TodoFilter(props) {
  const { active, onFilterClick, ...rest } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (filter) => () => {
    handleClose();
    onFilterClick && onFilterClick(filter);
  };

  return (
    <>
      <IconButton icon="filter" onClick={handleClick} {...rest} />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
        ].map((item) => (
          <MenuItem
            key={item.value}
            selected={active === item.value}
            onClick={handleMenuClick(item.value)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

TodoFilter.propTypes = {
  active: PropTypes.string,
  onFilterClick: PropTypes.any,
};

export default TodoFilter;
