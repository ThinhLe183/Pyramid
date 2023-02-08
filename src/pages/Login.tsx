import { FormEventHandler, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillLock,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo/Pyramid-black.png";
import { fetchUser, login, setUser } from "../features/User/slice/userSlice";
export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        const { user, access_token, refresh_token } = res;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        dispatch(setUser(user));
        navigate("/");
      });
  };

  return user ? (
    <Navigate to={"/"}></Navigate>
  ) : (
    <div className="min-h-screen flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white  p-10 rounded-xl flex flex-col gap-5 justify-evenly items-center w-96"
      >
        <div className="h-12 w-48">
          <img
            src={logo}
            alt=""
            className="object-cover object-center h-full w-full opacity-80"
          />
        </div>
        <div className="form-control w-full text-base-100 gap-3">
          <div className="w-full">
            <label className="label justify-start gap-2 ">
              <FaUser className="" />
              <span className="label-text text-base-100 font-medium ">
                Username
              </span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className=" input border-gray-300 focus:border-primary focus:outline-none border-2  input-bordered bg-transparent text-black w-full pr-10"
            />
          </div>

          <div className="w-full relative">
            <label className="label justify-start gap-2">
              <AiFillLock />
              <span className="label-text text-base-100 font-medium ">
                Password
              </span>
            </label>
            <input
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input border-gray-300 focus:border-primary focus:outline-none border-2  input-bordered bg-transparent text-black w-full pr-10"
            />
            <label className="swap absolute right-3 bottom-4">
              <input
                type="checkbox"
                checked={isVisible}
                readOnly
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              />
              <AiOutlineEyeInvisible className="swap-on" />
              <AiOutlineEye className="swap-off" />
            </label>
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <button type="submit" className="btn btn-primary capitalize">
            Submit
          </button>
          <button className="btn btn-outline capitalize hover:bg-stone-100">
            Register
          </button>
        </div>
        <div className="text-xs">
          Forgot password? Don't worry click{" "}
          <a
            target={"#"}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            className="link-primary font-medium hover:cursor-pointer"
          >
            here
          </a>
        </div>
      </form>
    </div>
  );
}
