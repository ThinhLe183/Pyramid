import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import People from "./features/People/People";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Chat</h1>,
      },
      {
        path: "active",
        element: <People />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
