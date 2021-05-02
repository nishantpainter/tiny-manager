import React, { useCallback } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ProjectForm from "TinyManager/components/ProjectForm";
import { ProjectType } from "TinyManager/types/index";
import { merge } from "TinyManager/services/Utils";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

function ProjectFormContainer(props) {
  const { onCancel, onSubmit, initialValues } = props;
  const classes = useStyles();

  const handleCancel = useCallback(() => onCancel(), [onCancel]);
  const handleSubmit = useCallback((values) => onSubmit(values), [onSubmit]);

  const formik = useFormik({
    initialValues: merge({ name: "", description: "" }, initialValues),
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required.";
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <div className={classes.container}>
      <ProjectForm
        values={formik.values}
        errors={formik.errors}
        onCancel={handleCancel}
        onChange={formik.handleChange}
        onSubmit={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </div>
  );
}

ProjectFormContainer.propTypes = {
  initialValues: ProjectType,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ProjectFormContainer;
