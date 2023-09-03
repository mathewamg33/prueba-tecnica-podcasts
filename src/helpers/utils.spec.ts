import { formatDate, formatDuration } from './utils'

describe('formatDate', () => {
  it('should format ISO date correctly', () => {
    const dateISO = '2023-09-05T08:30:00'

    const expectedFormattedDate = '05/09/2023'

    const formattedDate = formatDate(dateISO)

    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it('should handle single-digit day and month', () => {
    const dateISO = '2023-09-05T08:30:00'

    const expectedFormattedDate = '05/09/2023'

    const formattedDate = formatDate(dateISO)

    expect(formattedDate).toBe(expectedFormattedDate)
  })

  it('should handle different input ISO date', () => {
    const dateISO = '2023-12-31T20:45:00'

    const expectedFormattedDate = '31/12/2023'

    const formattedDate = formatDate(dateISO)

    expect(formattedDate).toBe(expectedFormattedDate)
  })
})

describe('formatDuration', () => {
  it('should format duration correctly', () => {
    const milliseconds = 3675000

    const expectedFormattedDuration = '01:01:15'

    const formattedDuration = formatDuration(milliseconds)

    expect(formattedDuration).toBe(expectedFormattedDuration)
  })

  it('should handle zero milliseconds', () => {
    const milliseconds = 0

    const expectedFormattedDuration = '00:00'

    const formattedDuration = formatDuration(milliseconds)

    expect(formattedDuration).toBe(expectedFormattedDuration)
  })

  it('should handle milliseconds less than one hour', () => {
    const milliseconds = 2300000

    const expectedFormattedDuration = '38:20'

    const formattedDuration = formatDuration(milliseconds)

    expect(formattedDuration).toBe(expectedFormattedDuration)
  })
})
