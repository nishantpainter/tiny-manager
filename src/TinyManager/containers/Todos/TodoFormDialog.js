import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@material-ui/core";

import TodoForm from "TinyManager/components/TodoForm";
import { TodoType } from "TinyManager/types";
import { merge } from "TinyManager/services/Utils";
import { useTranslation } from "TinyManager/providers/TranslationProvider";
import { useFormik } from "formik";

function TodoFormDialog(props) {
  const { initialValue = {}, open, disabled, onClose, onSubmit } = props;
  const { t } = useTranslation();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: merge({ title: "" }, initialValue),
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = t("Title is required");
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  const isEdit = values && values.id;
  const formTitle = isEdit ? t("Edit Todo") : t("Add Todo");

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <TodoForm
          title={formTitle}
          values={values}
          errors={errors}
          disabled={disabled}
          translate={t}
          onChange={handleChange}
          onCancel={onClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

TodoFormDialog.propTypes = {
  initialValue: TodoType,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TodoFormDialog;
