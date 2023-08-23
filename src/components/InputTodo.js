import React, { useState } from "react";
import { addTodo } from "../features/Todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function InputTodo() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.allTodos);

  const handleSubmit = (e) => {
    e.preventDefault();
    let modifiedTerm;
    if (
      todos.some(
        (item) =>
          item.content.toLowerCase().trim() === term.toLowerCase().trim()
      )
    ) {
      alert("Oops, looks like similar task is already on your list!");
      return;
    }
    else{
      modifiedTerm = term.trim()[0].toUpperCase().concat(term.slice(1));
    }
    const todoId = uuidv4();
    const content = modifiedTerm;
    const completed = false;  
    const important = false;

    const newTodo = { todoId, content, completed, important };
    dispatch(addTodo(newTodo));
    setTerm("");
    // setShowTodos(true);
  };

  return (
    <div className="todo-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          type="text"
          placeholder="What's on your mind..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}

export default InputTodo;
