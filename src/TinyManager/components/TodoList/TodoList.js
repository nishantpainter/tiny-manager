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
  const { todos, onTodoClick, onTodoCheck, onTodoDelete } = props;

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
          onDelete={onTodoDelete}
        />
      ))}
    </List>
  );
}

TodoList.propTypes = {
  /**
   * List of todos
   */
  todos: PropTypes.arrayOf(TodoType),
  /**
   * Todo on click handler
   */
  onTodoClick: PropTypes.func,
  /**
   * Todo on check handler
   */
  onTodoCheck: PropTypes.func,
  /**
   * Todo on delete handler
   */
  onTodoDelete: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  onTodoClick: () => {},
  onTodoCheck: () => {},
};

export default TodoList;
