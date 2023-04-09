
export async function iconFinder(query) {
    const res = await fetch(`https://api.iconfinder.com/v2/icons/search?query=${query}&size_minimum=512&count=1$style=classic`)
    if (res.status !== 200) {
        throw new Error('fetch rejected', res.status)
    }
    const data = res.json()
    return data
}
// icon finder
// https://api.iconfinder.com/v2/icons/search?query=${query}&size_minimum=512&count=1$style=classic

// weather
// https://api.open-meteo.com/v1/forecast?latitude=51.31&longitude=3.78&hourly=temperature_2m&current_weather=true