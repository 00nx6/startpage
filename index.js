import { iconFinder } from "./getIcon"

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
	switch (weather_code) {
		case 0:
			current_weather = 'Clear Skies'
			break;
		case 1 || 2 || 3:
			current_weather = 'Partly cloudy'
			break;
		case 45 || 48:
			current_weather = 'Fog'
			break;
		case 51 || 53 || 55:
			current_weather = 'Light drizzle'
			break;
		case 56 || 57:
			current_weather = 'Freezing Drizzle'
			break;
		case 61 || 63 || 65:
			current_weather = 'Rain'
			break;

	}
	const outlook = document.getElementById('outlook')
	outlook.innerText = current_weather
}

// add shortcut

const addShortcutBttn = document.getElementById('addShortcutBttn')
const shortcutCont = document.getElementById('shortcutsCont')
addShortcutBttn.addEventListener('click', () => {
	shortcutCont.innerHTML += `
	<div class="shortcutAddWindow">
	<input type="text" id="title" placeholder="Title">
	<input type="text" id="url" placeholder="URL">
	<div class="shortcutsCont">
			<button class="addShortcut" id="finaliseshortcut">
					<h3>+</h3>
			</button>
	</div>
	</div>
	`

	const title = document.getElementById('title')
	const url = document.getElementById('url')
	const doneBttn = document.getElementById('finaliseshortcut')
	doneBttn.addEventListener('click', () => {
		iconFinder(title.value)	
		.then(data => dataHandler(data, title.value, url.value))
	})
})

function dataHandler(data, title, url) {
	const icon = data.icons[3].raster_sizes[6].formats[0].preview_url

	const template = {
		title: title,
		url: url,
		img: icon,
	}

	const shortcutTemplate = `
	<div class="shortcut" data-key=${title}>
        <img src=${icon} alt="">
        <div class="title">
          <a href=${url}>${title}</a>
        </div>
    </div>
	`
	const test = {
		'title': 'Youtube',
		'link': 'https://www.youtube.com/',
	}
	localStorage.setItem('youtube', JSON.stringify(test))
	const templateKeys = [localStorage.getItem('templateKeys')]
	console.log(templateKeys)

}

// have a list in local storage that stores the keys to find shortcuts
// shortcuts should be stored in dividually with their keys being their titles


/* 
	<div class="shortcut" data-key={title}>
        <img src={img} alt="">
        <div class="title">
          <a href={url}>{title}</a>
        </div>
      </div>
 */