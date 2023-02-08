import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { fetchUser, resetError } from "./features/User/slice/userSlice";
import Loading from "./pages/Loading";
import { fetchConversations } from "./features/Conversation/slice/conversationSlice";

function App() {
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const promise = dispatch(fetchUser());
    return () => promise.abort();
  }, []);
  useEffect(() => {
    if (error) {
      dispatch(resetError);
      navigate("login");
    }
  }, [error]);
  

  return loading ? <Loading /> : <Outlet />;
}

export default App;
