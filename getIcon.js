export const Query = async (query) => {
    const res = await fetch(`https://api.iconfinder.com/v2/icons/search?query=${query}&count=1&premium=0&style=flat`)
    if (res.status !== 200) {
        throw new Error('fetch rejected', res.status)
    }
    const data = res.json()
    return  data
}
