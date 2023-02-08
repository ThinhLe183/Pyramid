import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchUser } from "../../features/User/slice/userSlice";
import Loading from "../../pages/Loading";

//Layout of protected routes
export default function MainLayout() {
  const {
    loading,
    isAuthenticating,
    data: user,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    
    if (!user && isAuthenticating) {
      const promise = dispatch(fetchUser());
      return () => promise.abort();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticating && !user) {
      navigate("login");
    }
  }, [isAuthenticating]);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex divide-x-2 divide-gray-600 divide-opacity-20 h-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
}
