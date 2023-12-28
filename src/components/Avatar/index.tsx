'use client'

interface Props {
  name: string,
  backgroundColor: string,
  textColor: string
}

export default function Avatar({ name, backgroundColor, textColor }:Props) {
  return (
    <span 
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md text-md"
      style={{ 
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      {name && name.trim()[0].toUpperCase()}
    </span>
  )


}