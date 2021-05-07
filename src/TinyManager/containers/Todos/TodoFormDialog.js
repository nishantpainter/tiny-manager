import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@material-ui/core";

import TodoForm from "TinyManager/components/TodoForm";
import { TodoType } from "TinyManager/types";
import { merge } from "TinyManager/services/Utils";
import { useTranslation } from "TinyManager/providers/TranslationProvider";

function TodoFormDialog(props) {
  const { initialValue, open, saving, onClose, onSubmit } = props;
  const { t } = useTranslation();

  const [values, setValues] = useState(merge({}, initialValue));
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!values.title) {
        setErrors({
          title: t("Title is required"),
        });
        return;
      }

      if (Object.keys(errors).length) {
        setErrors({});
      }

      onSubmit(values);
      setValues({ title: "" });
    },
    [t, values, errors, onSubmit]
  );

  const isEdit = values && values.id;
  const formTitle = isEdit ? t("Edit Todo") : t("Add Todo");

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <TodoForm
          title={formTitle}
          values={values}
          errors={errors}
          disabled={saving}
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
  saving: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TodoFormDialog;
