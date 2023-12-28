import Message from "@/models/Message"

interface Props {
  message: Message,
  id: number
}

export default function ChatItem({message, id}:Props) {
  return (
    <div className={`p-5 w-full flex items-center ${message.user_id == id ? 'justify-end' : 'justify-start'}`}>
    <div className={`w-full max-w-3xl relative p-5 rounded-b-md ${message.user_id == id ? 'bg-indigo-200 rounded-tl-md' : 'bg-indigo-100 rounded-tr-md'}`}>
      <span className={`w-6 h-6 absolute top-1/2 -translate-y-1/2  rotate-45 ${message.user_id == id ? 'bg-indigo-200 right-0 translate-x-1/2' : 'bg-indigo-100 left-0 -translate-x-1/2'}`}/>
      <div className="flex flex-col">
        <h5 className="font-bold">{message.name}</h5>
        <p className="text-md break-all">{message.content}</p>
      </div>
      <div className="flex justify-end">
        <span className="text-xs">{message.time}</span>
      </div>
    </div>
  </div>
  )
}