
export const randomDate = () => {
    const end = new Date()
    // one week
    const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const monthString = month < 10 ? `0${month}` : `${month}`
    const dayString = day < 10 ? `0${day}` : `${day}`
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutesString}:${secondsString}`
}


export const generateLabels = (count: number) => {
    const labels = []
    for (let i = 0; i < count; i++) {
        labels.push(randomDate())
    }
    return labels.sort((a, b) => a.getTime() - b.getTime()).map(date => formatDate(date))
}

export const generateData = (count: number) => {
    const data = []
    for (let i = 0; i < count; i++) {
        data.push(Math.random() * 100)
    }
    return data
}