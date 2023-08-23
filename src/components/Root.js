import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";

function Root() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>My Todo App</h1>
        </header>
        <Provider store={store}>
          <main>
            <Outlet />
          </main>
        </Provider> 
      </div>
    </div>
  );
}

export default Root;
