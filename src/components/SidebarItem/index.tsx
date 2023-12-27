import User from "@/models/User"
import Avatar from "../Avatar"

interface Props {
  user: User
}

export default function SidebarItem({user}:Props) {

  return (
    <div className="flex py-5 items-center border-b-2">
      <Avatar name={user.name} />
      <div className="flex flex-col ml-3">
        <div className="flex justify-center items-center">
          <h5 className="font-bold">{user.name}</h5>
          <span className={`ml-2 w-3 h-3 rounded-full ${user.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
        <small className="text-gray-400">{user.online ? 'Online' : 'Offline'}</small>
      </div>
    </div>
  )
}