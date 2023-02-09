import { Outlet } from "react-router-dom";

export default function People() {
  return (
    <>
      <div className=" w-1/4 max-w-sm ">
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </div>
      <Outlet />
    </>
  );
}
