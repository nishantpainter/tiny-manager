import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Button, Dialog, DialogContent } from "@material-ui/core";

import Loader from "TinyManager/components/Loader";
import TodoList from "TinyManager/components/TodoList";
import TodoForm from "TinyManager/components/TodoForm";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  addTodoButton: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  todosContainer: {
    height: "100%",
    textAlign: "right",
  },
}));

function Todos(props) {
  const { className } = props;

  const [
    { todos, todo, errors, loading, saving, dialogOpen },
    setStore,
  ] = React.useState({
    todos: [],
    todo: { title: "" },
    errors: {},
    loading: false,
    saving: false,
    dialogOpen: false,
  });

  const classes = useStyles();

  const fetchTodos = React.useCallback(() => {
    setStore((store) => ({ ...store, loading: true }));

    TinyManagerAPI.fetchTodos().then((todos) => {
      setStore((store) => ({ ...store, todos, loading: false }));
    });
  }, []);

  const handleOpenDialog = React.useCallback((e, todo) => {
    setStore((store) => ({ ...store, dialogOpen: true, todo }));
  });

  const handleCloseDialog = React.useCallback(() => {
    setStore((store) => ({
      ...store,
      dialogOpen: false,
      todo: { title: "" },
      errors: {},
    }));
  });

  const handleAddNewTodoClick = React.useCallback(
    (e) => {
      handleOpenDialog(e, { title: "" });
    },
    [handleOpenDialog]
  );

  const handleAddNewTodo = React.useCallback(() => {
    TinyManagerAPI.addTodo(todo)
      .then((todo) => {
        setStore((store) => ({
          ...store,
          saving: false,
          todos: [todo, ...store.todos],
        }));
        handleCloseDialog();
      })
      .catch(() => {
        setStore((store) => ({ ...store, saving: false }));
        alert("Error adding todo");
      });
  }, [todo, handleCloseDialog]);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!todo.title) {
        setStore((store) => ({
          ...store,
          errors: { title: "Title is required." },
        }));
        return;
      }

      setStore((store) => ({ ...store, saving: true }));

      if (Object.keys(errors).length) {
        setStore((store) => ({ ...store, errors: {} }));
      }

      if (todo.id) {
        /* Todo */
      } else {
        handleAddNewTodo();
      }
    },
    [todo, errors]
  );

  const handleChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;
      setStore((store) => ({
        ...store,
        todo: { ...store.todo, [name]: value },
      }));
    },
    [todo]
  );

  React.useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={className}>
      <Divider />
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.todosContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addTodoButton}
            onClick={handleAddNewTodoClick}
          >
            Add new Todo
          </Button>
          <TodoList todos={todos} />
        </div>
      )}

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          <TodoForm
            values={todo}
            errors={errors}
            disabled={saving}
            onChange={handleChange}
            onCancel={handleCloseDialog}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

Todos.propTypes = {
  className: PropTypes.string,
};

export default Todos;
