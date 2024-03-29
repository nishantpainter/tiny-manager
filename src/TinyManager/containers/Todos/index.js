import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import TodoFormDialog from "./TodoFormDialog";
import Loader from "TinyManager/components/Loader";
import TodoList from "TinyManager/components/TodoList";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";
import { useTranslation } from "TinyManager/providers/TranslationProvider";
import useDialog from "TinyManager/hooks/useDialog";
import ConfirmationDialog from "TinyManager/components/ConfirmationDialog/ConfirmationDialog";
import OutlinedSelect from "TinyManager/components/OutlinedSelect";

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
  const [{ todos, todo, loading, saving, edit }, setStore] = useState({
    todos: [],
    todo: { title: "" },
    loading: false,
    saving: false,
    edit: false,
  });

  const [
    deleteAllDialog,
    openDeleteAllDialog,
    closeDeleteAllDialog,
  ] = useDialog();

  const [filter, setFilter] = useState(FILTERS.All);
  const { t } = useTranslation();
  const classes = useStyles();

  const filterByMenu = useMemo(
    () =>
      Object.keys(FILTERS).map((key) => ({
        label: t(key),
        value: FILTERS[key],
      })),
    [t]
  );

  const filterTodos = useCallback(
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

  const fetchTodos = useCallback(() => {
    setStore((store) => ({ ...store, loading: true }));

    TinyManagerAPI.fetchTodos().then((todos) => {
      setStore((store) => ({
        ...store,
        todos: filterTodos(todos),
        loading: false,
      }));
    });
  }, [filterTodos]);

  const handleOpenDialog = useCallback((event, todo = { title: "" }) => {
    setStore((store) => ({ ...store, edit: true, todo: { ...todo } }));
  }, []);

  const handleCloseDialog = useCallback(() => {
    setStore((store) => ({
      ...store,
      edit: false,
      todo: { title: "" },
      errors: {},
    }));
  }, []);

  const handleAddNewTodo = useCallback(
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

  const handleEditTodo = useCallback(
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

  const handleSubmit = useCallback(
    (todo) => {
      setStore((store) => ({ ...store, saving: true }));
      const handle = todo.id ? handleEditTodo : handleAddNewTodo;
      handle(todo);
    },
    [handleAddNewTodo, handleEditTodo]
  );

  const handleTodoCheck = useCallback((e, todo) => {
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

  const handleTodoDelete = useCallback((e, todo) => {
    if (todo && todo.id) {
      TinyManagerAPI.removeTodo(todo).then(() => {
        setStore((store) => ({
          ...store,
          todos: store.todos.filter((t) => t.id !== todo.id),
        }));
      });
    }
  }, []);

  const handleDeleteAllTodos = useCallback(() => {
    if (todos.length) {
      TinyManagerAPI.removeBulkTodos(todos.map(({ id }) => id)).then(() => {
        setStore((store) => ({ ...store, todos: [] }));
      });
    }
    closeDeleteAllDialog();
  }, [todos, closeDeleteAllDialog]);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  useEffect(() => {
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
            <OutlinedSelect
              id="todo-filter-by"
              label={t("Filter By")}
              translate={t}
              value={filter}
              className={classes.todosFilter}
              menu={filterByMenu}
              onChange={handleFilterChange}
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Button
                color="primary"
                variant="outlined"
                onClick={openDeleteAllDialog}
                disabled={!todos.length}
              >
                {t("Delete All")}
              </Button>
              &nbsp;&nbsp;
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpenDialog}
              >
                {t("Add")}
              </Button>
            </Box>
          </Box>

          <TodoList
            todos={todos}
            translate={t}
            onClick={handleOpenDialog}
            onCheck={handleTodoCheck}
            onDelete={handleTodoDelete}
          />
        </div>
      )}
      {edit && (
        <TodoFormDialog
          initialValue={todo}
          open={edit}
          disabled={saving}
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
        />
      )}
      <ConfirmationDialog
        title={t("Delete All Todos")}
        content={t("Do you want to remove all the todos ?")}
        open={deleteAllDialog}
        translate={t}
        onClose={closeDeleteAllDialog}
        onConfirm={handleDeleteAllTodos}
      />
    </div>
  );
}

Todos.propTypes = {
  className: PropTypes.string,
};

export default Todos;
