'use client'

import generateRandomBackgroundAndColor from "@/utils/randomColor"

interface Props {
  name: string
}

export default function Avatar({ name }:Props) {

  const { backgroundColor, textColor } = generateRandomBackgroundAndColor()

  return (
    <span 
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md text-md"
      style={{ 
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      {name[0].trim().toUpperCase()}
    </span>
  )


}