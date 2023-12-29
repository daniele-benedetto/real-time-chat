function randomColor(): string {
  const characters = '0123456789ABCDEF'
  const length = 6
  let hexCode = '#'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    hexCode += characters.charAt(randomIndex)
  }

  return hexCode
}

const getTextColorClass = (backgroundColor:string) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? '#000' : '#fff'
}

const generateRandomBackgroundAndColor = () => {
  const backgroundColor = randomColor()
  const textColor = getTextColorClass(backgroundColor)
  return { backgroundColor, textColor }
}

export default generateRandomBackgroundAndColor