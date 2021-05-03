import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@material-ui/core";

import TodoForm from "TinyManager/components/TodoForm";
import { TodoType } from "TinyManager/types";

function TodoFormDialog(props) {
  const { initialValue, open, saving, onClose, onSubmit } = props;

  const [{ todo, errors }, setStore] = useState({
    todo: Object.assign({}, initialValue),
    errors: {},
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setStore((store) => ({
      ...store,
      todo: { ...store.todo, [name]: value },
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!todo.title) {
        setStore((store) => ({
          ...store,
          errors: { title: "Title is required." },
        }));
        return;
      }

      if (Object.keys(errors).length) {
        setStore((store) => ({ ...store, errors: {} }));
      }

      onSubmit(todo);
      setStore((store) => ({ ...store, todo: { title: "" } }));
    },
    [todo, errors, onSubmit]
  );

  const isEdit = todo && todo.id;
  const formTitle = isEdit ? "Edit Todo" : "Add Todo";

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <TodoForm
          title={formTitle}
          values={todo}
          errors={errors}
          disabled={saving}
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
