import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import TaskForm from "TinyManager/components/TaskForm";
import { TaskType } from "TinyManager/types";

function TaskFormContainer(props) {
  const { onCancel, onSubmit, initialValues } = props;

  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
      priority: 0,
      progress: 0,
      ...initialValues,
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
    enableReinitialize: true,
  });

  const isEdit = initialValues && initialValues.id;
  const formTitle = isEdit ? "Edit Task" : "New Task";

  return (
    <TaskForm
      values={formik.values}
      errors={formik.errors}
      onCancel={onCancel}
      disabled={formik.isSubmitting}
      onSubmit={formik.handleSubmit}
      onChange={formik.handleChange}
      title={formTitle}
    />
  );
}

TaskFormContainer.propTypes = {
  initialValues: TaskType,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TaskFormContainer;
