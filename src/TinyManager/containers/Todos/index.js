import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Button } from "@material-ui/core";

import TodoFormDialog from "./TodoFormDialog";
import Loader from "TinyManager/components/Loader";
import TodoList from "TinyManager/components/TodoList";
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
    { todos, todo, loading, saving, dialogOpen },
    setStore,
  ] = React.useState({
    todos: [],
    todo: { title: "" },
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

  const handleAddNewTodo = React.useCallback(
    (todo) => {
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
    },
    [handleCloseDialog]
  );

  const handleSubmit = React.useCallback((todo) => {
    setStore((store) => ({ ...store, saving: true }));

    if (todo.id) {
      /* Todo */
    } else {
      handleAddNewTodo(todo);
    }
  }, []);

  const handleTodoCheck = React.useCallback((e, todo) => {
    if (todo && todo.id) {
      setStore((store) => ({
        ...store,
        todos: store.todos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        ),
      }));
    }
  });

  const handleTodoDelete = React.useCallback((e, todo) => {
    if (todo && todo.id) {
      setStore((store) => ({
        ...store,
        todos: store.todos.filter((t) => t.id !== todo.id),
      }));
    }
  });

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
          <TodoList
            todos={todos}
            onTodoCheck={handleTodoCheck}
            onTodoDelete={handleTodoDelete}
          />
        </div>
      )}
      <TodoFormDialog
        intitialValue={todo}
        open={dialogOpen}
        saving={saving}
        onSubmit={handleSubmit}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

Todos.propTypes = {
  className: PropTypes.string,
};

export default Todos;
