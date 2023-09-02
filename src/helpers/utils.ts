export const hasDayPassedSinceLastUpdate = (
  keyLocalStorage: string,
): boolean => {
  const data = JSON.parse(
    window.localStorage.getItem(keyLocalStorage) as string,
  )

  if (data?.episodes === null || data?.value === null || data?.timestamp == null) {
    return true
  }

  const currentTime = new Date().getTime()
  const lastUpdateTimestamp = data?.timestamp

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000

  return currentTime - lastUpdateTimestamp >= oneDayInMilliseconds
}

export const formatDate = (dateISO: string): string => {
  const date = new Date(dateISO)
  const day = date.getDate()
  const month = date.getMonth() + 1 // Adding 1 because months are 0-indexed
  const year = date.getFullYear()

  // Format the values to have two digits (e.g., 01 instead of 1)
  const formattedDay = day.toString().padStart(2, '0')
  const formattedMonth = month.toString().padStart(2, '0')

  // Create the string in the "day/month/year" format
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`

  return formattedDate
}

export const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000) // Convert milliseconds to seconds
  const hours = Math.floor(totalSeconds / 3600) // Get hours
  const minutes = Math.floor((totalSeconds % 3600) / 60) // Get minutes
  const seconds = totalSeconds % 60 // Get seconds

  // Create strings for time parts with two digits and no leading zeros
  const formattedHours = hours > 0 ? hours.toString().padStart(2, '0') : ''
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  // Combine time parts only if they are greater than zero
  const timeParts = [formattedHours, formattedMinutes, formattedSeconds].filter(
    (part) => part !== '',
  )

  // Join the time parts with ':' and return the formatted string
  const formattedTime = timeParts.join(':')
  return formattedTime
}
