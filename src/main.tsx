import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat";
import Conversation from "./pages/Conversation";
import Login from "./pages/Login";
import People from "./pages/People";
import MainLayout from "./layouts/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Conversation />,
            children: [{ path: "d/:id", element: <Chat /> }],
          },
          {
            path: "active",
            element: <People />,
            children: [{ path: "d/:id" }],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
