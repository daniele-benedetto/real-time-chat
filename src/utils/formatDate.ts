const formattedDate = (now: Date): string => {
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`
    const hours = now.getHours() > 9 ? now.getHours() : `0${now.getHours()}`
    const minutes = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`
    const seconds = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`
    
    const date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    return date
}

export default formattedDate