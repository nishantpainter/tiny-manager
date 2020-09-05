import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Button } from "@material-ui/core";

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

  const [{ todos, loading }, setStore] = React.useState({
    todos: [],
    loading: false,
  });

  const classes = useStyles();

  const fetchTodos = React.useCallback(() => {
    setStore((store) => ({ ...store, loading: true }));

    TinyManagerAPI.fetchTodos().then((todos) => {
      setStore({ todos, loading: false });
    });
  }, []);

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
          >
            Add new Todo
          </Button>
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
}

Todos.propTypes = {
  className: PropTypes.string,
};

export default Todos;
