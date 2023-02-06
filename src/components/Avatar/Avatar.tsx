import defaultAvatar from "../../assets/avatar/default-avatar.png";
interface AvatarProps {
  src?: string | undefined | null;
  extraClass?: string;
}
export default function Avatar({ extraClass, src }: AvatarProps) {
  return (
    <div className="avatar">
      <div className={`w-12 rounded-full ${extraClass}`}>
        <img src={src ? src : defaultAvatar} alt="" />
      </div>
    </div>
  );
}
