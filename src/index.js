import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./providers/userProvider";
import router from "./router";
import { ExercisesProvider } from "./providers/workoutsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ExercisesProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ExercisesProvider>
    </UserProvider>
  </React.StrictMode>
);
