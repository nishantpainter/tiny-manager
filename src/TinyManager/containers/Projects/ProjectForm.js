import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ProjectForm from "TinyManager/components/ProjectForm";
import { ProjectType } from "TinyManager/types/index";

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

  const handleCancel = React.useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleSubmit = React.useCallback(
    (values) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      ...initialValues,
    },
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
