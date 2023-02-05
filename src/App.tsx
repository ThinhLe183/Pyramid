import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { fetchUser, resetError } from "./features/User/slice/userSlice";
import Loading from "./pages/Loading";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    const promise = dispatch(fetchUser());
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate("/login");
      dispatch(resetError);
    }
  }, [error]);

  

  return loading ? <Loading /> : <Outlet />;
}

export default App;
