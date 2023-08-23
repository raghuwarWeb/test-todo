import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navigations({ showTodos, setShowTodos }) {
  const todos = useSelector((state) => state.todos.allTodos);

  const todosLeft = () => {
    const num = todos.filter((item) => !item.completed).length;

    if (num === 1) {
      return `${num} item left`;
    } else {
      return `${num} items left`;
    }
  };

  const expand = () => {
    setShowTodos(!showTodos);
  };

  return (
    <nav className="navigations">
      <div className="todo-left">{todosLeft()}</div>

      <div class="center-buttons">
        <NavLink to="/all" className="all-btn">
          All
        </NavLink>
        <NavLink to="/completed" className="complete-btn">
          Completed
        </NavLink>
        <NavLink to="/active" className="active-btn">
          Active
        </NavLink>
      </div>

      <div class="expand-btn">
        <button className="icon" onClick={expand}>
          {showTodos ? (
            <lord-icon
              src="https://cdn.lordicon.com/xsdtfyne.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "25px", height: "70px" }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/rxufjlal.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "25px", height: "70px" }}
            ></lord-icon>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navigations;
