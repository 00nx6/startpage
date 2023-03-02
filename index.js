
import {links} from './shortcuts.json'

const shortcutsCont = document.getElementById('shortcutsCont')

links.forEach(e => {
    let query = e.name
    const getIcon = async (query) => {
        const res =  await fetch(`https://api.iconfinder.com/v2/icons/search?query=${query}&size_minimum=512&count=1$style=classic`)
        if (res.status != 200) {
            throw new Error('fetch rejected', res.status)
        }
        const data = res.json()
        return data
    }
    getIcon(query).then(data => generateElements(data, e))
})

function generateElements(res, e) {
    let icon = res.icons[3].raster_sizes[6].formats[0].preview_url
    shortcutsCont.innerHTML += `
    <div class="shortcut">
        <a href=${e.link}>
            <img src=${icon} alt="" srcset="">
            <h2>${e.name}</h2>
        </a>
      </div>
    `
}


const weather = async () => {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.31&longitude=3.78&hourly=temperature_2m&current_weather=true')
    if (res.status !== 200) {
        throw new Error('fetch rejected')
    }
    const data = res.json()
    return data
}
weather().then(data => htmlUpdate(data))


function htmlUpdate(weather) {
    const daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dateHandle = new Date(); 
    let today = dateHandle.getDay()
    // day
    const day = document.getElementById('day')
    day.textContent = daylist[today]
    // date
    const date = document.getElementById('date')
    date.textContent = `${dateHandle.getDate()} / ${dateHandle.getMonth() + 1} / ${dateHandle.getFullYear()}`

    // weather
    const temp = document.getElementsByClassName('celsius')
    temp[0].textContent = weather.current_weather.temperature + weather.hourly_units.temperature_2m
    
    let weather_code = weather.current_weather.weathercode    
    let current_weather;
    switch (weather_code){
        case 0:
            current_weather = 'Clear Skies'
            break;
        case 1 | 2 | 3:
            current_weather = 'Partly cloudy'
            break;
        case 45 | 48:
            current_weather = 'Fog'
            break;
        case 51 | 53 | 55: 
            current_weather = 'Light drizzle'
            break;
        case 56 | 57:
            current_weather = 'Freezing Drizzle'
            break;
        case 61 | 63 | 65:
            current_weather = 'Rain'
            break;
    }
    const outlook = document.getElementById('outlook')
    outlook.innerText = current_weather
    
}


// seperate the icon api call and then call to it when ever it is needed.
// save current shortrcuts at the end of session to local storage
// when a new shortcut is created add it to local storage and send it to apicall
// retrieve api call result and implement it <3
// have fun loser