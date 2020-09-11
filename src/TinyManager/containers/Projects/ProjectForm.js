import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import ProjectForm from "TinyManager/components/ProjectForm";

function ProjectFormContainer(props) {
  const { history } = props;

  const handleCancel = React.useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = React.useCallback((values) => {
    const { name, description } = values;
    console.log(name, description);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
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
  history: PropTypes.object,
};

export default ProjectFormContainer;
