import React, { useState } from "react";
import InputTodo from "../../components/InputTodo";
import Navigations from "../../components/Navigations";
import ActionButtons from "../../components/ActionButtons"; //this naming can cause error;
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Todos() {
    const [showTodos, setShowTodos] = useState(true);
    const todos = useSelector(state => state.todos.allTodos)

  return (
    <div className="todo-app">
      <InputTodo></InputTodo>
      {todos.length > 0 && (
      <>
        <Navigations showTodos={showTodos} setShowTodos={setShowTodos} />
        {showTodos && <Outlet></Outlet>}
        <hr />
        <ActionButtons></ActionButtons>
      </>
      )}
    </div>
  );
}

export default Todos;
