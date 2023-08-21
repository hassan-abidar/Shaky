import { Avatar , AvatarImage } from "./ui/avatar";

const DevAvatar = () => {
    return ( 
        <Avatar className="h-10 w-10">
            <AvatarImage className="p-1" src="profil_dev.png" />
        </Avatar>
     );
}
 
export default DevAvatar;