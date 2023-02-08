import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Chat from "./pages/Chat";
import Conversation from "./pages/Conversation";
import Login from "./pages/Login";
import People from "./pages/People";

const router = createBrowserRouter([
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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
