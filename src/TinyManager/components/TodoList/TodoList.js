import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Todo from "../Todo";
import { TodoType } from "TinyManager/types";
import { noop } from "../utils";

const useStyles = makeStyles({
  list: {
    overflow: "auto",
    height: "90%",
  },
});

function TodoList(props) {
  const { todos, translate, onTodoClick, onTodoCheck, onTodoDelete } = props;

  const classes = useStyles();

  if (todos.length === 0) {
    return (
      <Typography>
        {translate("Nothing to be completed. Enjoy your day.")}
      </Typography>
    );
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
   * Translate
   */
  translate: PropTypes.func,
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
  onTodoClick: noop,
  onTodoCheck: noop,
};

export default TodoList;
