import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import TaskForm from "TinyManager/components/TaskForm";

function TaskFormContainer(props) {
  const { onCancel, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
      priority: 0,
      progress: 0,
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "Title is required.";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <TaskForm
      values={formik.values}
      errors={formik.errors}
      onCancel={onCancel}
      disabled={formik.isSubmitting}
      onSubmit={formik.handleSubmit}
      onChange={formik.handleChange}
    />
  );
}

TaskFormContainer.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TaskFormContainer;
