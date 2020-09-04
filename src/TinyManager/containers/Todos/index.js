import React from "react";
import { Divider } from "@material-ui/core";

import Loader from "TinyManager/components/Loader";
import TodoList from "TinyManager/components/TodoList";
import TinyManagerAPI from "TinyManager/services/TinyManagerAPI";

function Todos(props) {
  const { className } = props;

  const [{ todos, loading }, setStore] = React.useState({
    todos: [],
    loading: false,
  });

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
      {loading ? <Loader /> : <TodoList todos={todos} />}
    </div>
  );
}

export default Todos;
