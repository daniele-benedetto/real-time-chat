const randomColor = () => {  
  const random = Math.floor(Math.random() * 16777215).toString(16)
    return `#${random}`
}

const getTextColorClass = (backgroundColor:string) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? '#000' : '#fff';
}

const generateRandomBackgroundAndColor = () => {
  const backgroundColor = randomColor()
  const textColor = getTextColorClass(backgroundColor)
  return { backgroundColor, textColor }
}

export default generateRandomBackgroundAndColor