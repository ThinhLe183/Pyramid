import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SyncLoader color="#fff" size={24} />
    </div>
  );
}
