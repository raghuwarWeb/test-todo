import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  toggleTodo,
  removeTodo,
  setTodos,
  important,
} from "../features/Todos/todosSlice";
function TodosList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.allTodos);

  let filteredTodos;

  const { type } = useParams();

  if (type === "completed") {
    filteredTodos = todos.filter((item) => item.completed);
  } else if (type === "active") {
    filteredTodos = todos.filter((item) => !item.completed);
  } else if (todos.some((item) => item.important)) {
    filteredTodos = todos
      .filter((item) => item.important)
      .concat(todos.filter((item) => !item.important));
  } else {
    filteredTodos = todos;
  }

  const toggle = (e, todoToToggle) => {
    dispatch(toggleTodo(todoToToggle.todoId));
  };

  const remove = (id) => {
    dispatch(removeTodo(id));
  };

  const edit = (e, todo) => {
    const text = e.target;
    text.contentEditable = true;
    const initialText = text.innerHTML;
    const onEnter = (event) => {
      if (event.key === "Enter") {
        let value = text.innerHTML;
        value = value || initialText;
        text.innerHTML = value;
        text.contentEditable = false;
        text.removeEventListener("keydown", onEnter);
        event.preventDefault();
        let clone;
        const updatedTodos = todos.map((item) => {
          if (item.todoId === todo.todoId) {
            clone = { ...item, content: value };
            return clone;
          }
          return item;
        });

        dispatch(setTodos(updatedTodos));
      }
    };
    text.addEventListener("keydown", onEnter);
  };

  const togglePriority = (priorTodoId) => {
    dispatch(important(priorTodoId));
  };
  return (
    <div className="todos">
      <ul className="todo-list">
        {filteredTodos.map((todo, i) => {
          return (
            <>
              <li
                className={`todo-item ${todo.completed ? "done" : ""}`}
                key={todo.id}
              >
                <div className="item">
                  <div className="todo-buttons">
                    <div class="container">
                      <button class="main-button">
                        <strong>. . .</strong>
                      </button>
                      <div class="sub-buttons">
                        <abbr title="Mark as done">
                          <button
                            className="todo-button done-button sub-button"
                            onClick={(e) => toggle(e, todo)}
                          >
                            {todo.completed ? "↩" : "✔"}
                          </button>
                        </abbr>
                        <abbr title="Remove Item">
                          <button
                            className="todo-button remove-button sub-button"
                            onClick={() => remove(todo.todoId)}
                          >
                            ✖
                          </button>
                        </abbr>
                        <abbr title="Mark Important">
                          <button
                            className="todo-button prior-button sub-button"
                            onClick={() => togglePriority(todo.todoId)}
                          >
                            🏳️
                          </button>
                        </abbr>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`todo-text ${todo.important ? "important" : ""}`}
                    onMouseDown={(e) => edit(e, todo)}
                  >
                    <span className="todo-number">{i + 1}</span>{" "}
                    <span className="todo-content">{todo.content}</span>
                  </p>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default TodosList;
