import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import TodosFilter from "./TodoFilter";
import TodoFormDialog from "./TodoFormDialog";
import Loader from "TinyManager/components/Loader";
import TodoList from "TinyManager/components/TodoList";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
    display: "flex",
    padding: theme.spacing(1),
  },
  todosContainer: {
    flex: 1,
    height: "100%",
    textAlign: "right",
  },
  todosFilter: {
    marginRight: theme.spacing(),
  },
}));

export const FILTERS = {
  Completed: "completed",
  Pending: "pending",
  All: "all",
};

function Todos() {
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

  const [filter, setFilter] = React.useState("all");

  const classes = useStyles();

  const filterTodos = React.useCallback(
    (todos = []) => {
      switch (filter) {
        case FILTERS.Completed:
          return todos.filter((t) => t.completed);
        case FILTERS.Pending:
          return todos.filter((t) => !t.completed);
        case FILTERS.All:
        default:
          return todos;
      }
    },
    [filter]
  );

  const fetchTodos = React.useCallback(() => {
    setStore((store) => ({ ...store, loading: true }));

    TinyManagerAPI.fetchTodos().then((todos) => {
      setStore((store) => ({
        ...store,
        todos: filterTodos(todos),
        loading: false,
      }));
    });
  }, [filterTodos]);

  const handleOpenDialog = React.useCallback((e, todo = {}) => {
    setStore((store) => ({ ...store, dialogOpen: true, todo: { ...todo } }));
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setStore((store) => ({
      ...store,
      dialogOpen: false,
      todo: { title: "" },
      errors: {},
    }));
  }, []);

  const handleAddNewTodoClick = React.useCallback(
    (e) => {
      handleOpenDialog(e, { title: "" });
    },
    [handleOpenDialog]
  );

  const handleTodoClick = React.useCallback(
    (e, todo) => {
      handleOpenDialog(e, todo);
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

  const handleEditTodo = React.useCallback(
    (todo) => {
      TinyManagerAPI.updateTodo(todo)
        .then((todo) => {
          setStore((store) => {
            return {
              ...store,
              saving: false,
              todos: store.todos.map((t) => (t.id === todo.id ? todo : t)),
            };
          });
          handleCloseDialog();
        })
        .catch(() => {
          setStore((store) => ({ ...store, saving: false }));
          alert("Error editing todo");
        });
    },
    [handleCloseDialog]
  );

  const handleSubmit = React.useCallback(
    (todo) => {
      setStore((store) => ({ ...store, saving: true }));
      if (todo.id) {
        handleEditTodo(todo);
      } else {
        handleAddNewTodo(todo);
      }
    },
    [handleAddNewTodo, handleEditTodo]
  );

  const handleTodoCheck = React.useCallback((e, todo) => {
    if (todo && todo.id) {
      TinyManagerAPI.updateTodo(
        Object.assign({}, todo, { completed: !todo.completed })
      ).then(() => {
        setStore((store) => ({
          ...store,
          todos: store.todos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
          ),
        }));
      });
    }
  }, []);

  const handleTodoDelete = React.useCallback((e, todo) => {
    if (todo && todo.id) {
      TinyManagerAPI.removeTodo(todo).then(() => {
        setStore((store) => ({
          ...store,
          todos: store.todos.filter((t) => t.id !== todo.id),
        }));
      });
    }
  }, []);

  const handleFilterChange = React.useCallback((filter) => {
    setFilter(filter);
  }, []);

  React.useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={classes.container}>
      <Divider />
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.todosContainer}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop={1}
            marginBottom={1}
          >
            <TodosFilter
              className={classes.todosFilter}
              value={filter}
              onChange={handleFilterChange}
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Button
                color="primary"
                variant="contained"
                onClick={handleAddNewTodoClick}
              >
                Add
              </Button>
            </Box>
          </Box>

          <TodoList
            todos={todos}
            onTodoClick={handleTodoClick}
            onTodoCheck={handleTodoCheck}
            onTodoDelete={handleTodoDelete}
          />
        </div>
      )}
      {dialogOpen && (
        <TodoFormDialog
          initialValue={todo}
          open={dialogOpen}
          saving={saving}
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}

Todos.propTypes = {
  className: PropTypes.string,
};

export default Todos;
