import { createSlice } from "@reduxjs/toolkit";

//use local storage to get stored Todos
const storedTodos = JSON.parse(localStorage.getItem("todos"));
let initialState;
if (storedTodos.length) {
  initialState = { allTodos: storedTodos };
} else {
  initialState = { allTodos: [] };
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.allTodos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.allTodos));
    },

    toggleTodo: (state, action) => {
      const updatedTodos = state.allTodos.map((item) => {
        if (item.todoId === action.payload) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
      state.allTodos = updatedTodos;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    },

    removeTodo: (state, action) => {
      const updatedTodos = state.allTodos.filter(
        (item) => item.todoId !== action.payload
      );
      state.allTodos = updatedTodos;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    },

    completeAll: (state) => {
      const updatedTodos = state.allTodos.map((item) => {
        return { ...item, completed: true };
      });
      state.allTodos = updatedTodos;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    },

    clearCompleted: (state) => {
      const updatedTodos = state.allTodos.filter((item) => !item.completed);
      state.allTodos = updatedTodos;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    },
    
    setTodos: (state, action) => {
      state.allTodos = action.payload;
      localStorage.setItem("todos", JSON.stringify(action.payload));
    },

    important: (state, action) => {
      const updatedTodos = state.allTodos.map(item => {
        if(item.todoId === action.payload){
          return {...item, important: !item.important}
        }
        else{
          return item;
        }
      })
      state.allTodos = updatedTodos;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  },
});

export const { addTodo, toggleTodo, removeTodo, completeAll, clearCompleted, setTodos, important } =  todosSlice.actions;
const todosReducer = todosSlice.reducer;
export default todosReducer;
