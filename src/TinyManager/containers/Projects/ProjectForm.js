import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import ProjectForm from "TinyManager/components/ProjectForm";
import { ProjectType } from "TinyManager/types/index";

function ProjectFormContainer(props) {
  const { onCancel, onSubmit, initialValues } = props;

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
    <ProjectForm
      values={formik.values}
      errors={formik.errors}
      onCancel={handleCancel}
      onChange={formik.handleChange}
      onSubmit={formik.handleSubmit}
      disabled={formik.isSubmitting}
    />
  );
}

ProjectFormContainer.propTypes = {
  initialValues: ProjectType,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ProjectFormContainer;
