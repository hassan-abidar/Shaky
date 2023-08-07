import { useUser } from "@clerk/nextjs";
import { Avatar } from "@/components/ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <div>
      <Avatar className="h-8 w-8">
        <img
          className="w-full h-full object-cover rounded-full"
          src={user?.profileImageUrl}
          alt={`Profile of ${user?.firstName}`}
        />
      </Avatar>
    </div>
  );
};

export default UserAvatar;
