export function formatDate(date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))
}

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
}
