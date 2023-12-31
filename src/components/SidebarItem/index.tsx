import User from "@/models/User"
import Avatar from "../Avatar"

interface Props {
  user: User
}

export default function SidebarItem({user}:Props) {

  return (
    <div className="flex py-5 items-center border-b-2">
      <div className="flex items-center w-full relative">
        <Avatar name={user.name} backgroundColor={user.backgroundColor} textColor={user.textColor} />
        <div className="flex flex-col">
          <h5 className="font-bold  ml-3">{user.name}</h5>
          <small className="text-gray-400  ml-3">{user.online ? 'Online' : 'Offline'}</small>
        </div>
        <span className={
          `w-3 h-3 ml-2 rounded-full 
          ${user.online ? 'bg-green-500' : 'bg-red-500'}
          absolute top-1/2 right-0 -translate-y-1/2`
        }></span>
      </div>  
    </div>
  )
}