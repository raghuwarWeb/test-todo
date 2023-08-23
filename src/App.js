import React from "react";
import "./App.css";
import Root from "./components/Root";
import Todos from "./features/Todos/Todos";

//routing code
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TodosList from "./components/TodosList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Todos />}>
        <Route index element={<TodosList/>}></Route>
        <Route path=":type" element={<TodosList />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
