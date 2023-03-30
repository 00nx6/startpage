export const iconFinder = async (query) => {
    const res = await fetch(`https://api.iconfinder.com/v2/icons/search?query=${query}&size_minimum=512&count=1$style=classic`)
    if (res.status !== 200) {
        throw new Error('fetch rejected', res.status)
    }
    const data = res.json()
    return data
}