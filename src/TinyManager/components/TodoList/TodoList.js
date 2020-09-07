import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";

import Todo from "../Todo";
import { TodoType } from "TinyManager/types";

const useStyles = makeStyles({
  list: {
    overflow: "auto",
    height: "95%",
  },
});

function TodoList(props) {
  const { todos, onTodoClick, onTodoCheck } = props;

  const classes = useStyles();

  if (todos.length === 0) {
    return <Typography>Nothing to be completed. Enjoy your day.</Typography>;
  }

  return (
    <List className={classes.list}>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onClick={onTodoClick}
          onCheck={onTodoCheck}
        />
      ))}
    </List>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType),
  onTodoClick: PropTypes.func,
  onTodoCheck: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  onTodoClick: () => {},
  onTodoCheck: () => {},
};

export default TodoList;
