// lib/utils/ulid.ts
import { ulid as generateUlid, decodeTime } from 'ulid'

/**
 * Generate a ULID (uppercase)
 */
export function ulid(seedTime?: number): string {
    return generateUlid(seedTime).toUpperCase()
}

/**
 * Generate ULID from a Date object
 */
export function ulidFromDate(date: Date): string {
    return ulid(date.getTime())
}

/**
 * Extract timestamp from ULID
 */
export function ulidToDate(id: string): Date {
    return new Date(decodeTime(id))
}

/**
 * Validate ULID format
 */
export function isValidUlid(id: string): boolean {
    // ULID is 26 characters, alphanumeric (Crockford's Base32)
    const ulidRegex = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/
    return ulidRegex.test(id)
}

/**
 * Generate monotonic ULID factory
 * Ensures ULIDs are always increasing even within the same millisecond
 */
export function createMonotonicUlidFactory() {
    let lastTime = 0
    let lastRandom = ''

    return (seedTime?: number): string => {
        const time = seedTime ?? Date.now()

        if (time === lastTime) {
            // Increment the random component
            const randomChars = lastRandom.split('')
            for (let i = randomChars.length - 1; i >= 0; i--) {
                const char = randomChars[i]
                const charCode = char.charCodeAt(0)

                if (charCode < 90) { // Can increment
                    randomChars[i] = String.fromCharCode(charCode + 1)
                    break
                } else {
                    randomChars[i] = '0'
                }
            }
            lastRandom = randomChars.join('')

            const timeComponent = ulid(time).substring(0, 10)
            return (timeComponent + lastRandom).toUpperCase()
        } else {
            lastTime = time
            const id = ulid(time)
            lastRandom = id.substring(10)
            return id.toUpperCase()
        }
    }
}
