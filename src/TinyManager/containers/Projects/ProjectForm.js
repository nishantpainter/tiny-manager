import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import ProjectForm from "TinyManager/components/ProjectForm";
import { ProjectType } from "TinyManager/types/index";
import { merge } from "TinyManager/services/Utils";
import { useTranslation } from "TinyManager/providers/TranslationProvider";

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
  const { t } = useTranslation();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: merge({ name: "", description: "" }, initialValues),
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required.";
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
  });

  const edit = values && values.id;
  const title = edit ? t("Edit Project") : t("New Project");

  return (
    <div className={classes.container}>
      <ProjectForm
        title={title}
        translate={t}
        values={values}
        errors={errors}
        onCancel={onCancel}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
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
