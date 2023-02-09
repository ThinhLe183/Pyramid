import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
        children: [
          { path: "d/:id", element: <Chat /> },
          {
            index: true,
            element: (
              <div className="grow flex h-full justify-center items-center text-2xl font-semibold">
                Select a chat or start a new conversation
              </div>
            ),
          },
        ],
      },
      {
        path: "active",
        element: <People />,
        children: [{ path: "d/:id", element: <Chat /> }],
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
