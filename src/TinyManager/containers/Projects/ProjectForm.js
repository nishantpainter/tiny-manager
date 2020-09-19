import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import ProjectForm from "TinyManager/components/ProjectForm";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

function ProjectFormContainer(props) {
  const { redirectToProjectList } = props;

  const handleCancel = React.useCallback(() => {
    redirectToProjectList();
  }, [redirectToProjectList]);

  const handleSubmit = React.useCallback(
    (values) => {
      TinyManagerAPI.addProject(values).then(redirectToProjectList);
    },
    [redirectToProjectList]
  );

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
  redirectToProjectList: PropTypes.func,
};

export default ProjectFormContainer;
