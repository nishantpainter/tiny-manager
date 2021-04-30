import React from "react";
import PropTypes from "prop-types";
import MuiIconButton from "@material-ui/core/IconButton";

import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import AttachFile from "@material-ui/icons/AttachFile";
import InvertColors from "@material-ui/icons/InvertColors";
import Delete from "@material-ui/icons/Delete";
import Language from "@material-ui/icons/Language";

const icons = {
  filter: FilterListIcon,
  edit: EditIcon,
  attachment: AttachFile,
  invertColors: InvertColors,
  delete: Delete,
  language: Language,
};

function IconButton(props) {
  const { icon, ...rest } = props;
  const Icon = icons[icon];
  return (
    <MuiIconButton size="small" {...rest}>
      <Icon />
    </MuiIconButton>
  );
}

IconButton.propTypes = {
  /** Icon to be displayed */
  icon: PropTypes.string,
};

export default IconButton;
