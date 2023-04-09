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

	const shortcutKeys = JSON.parse(localStorage.getItem('shortcutKeys'))

	const template = {
		title: title,
		icon: icon,
		link: url
	}
	
	shortcutKeys.push(template)

	localStorage.setItem('shortcutKeys', JSON.stringify(shortcutKeys))

	shortcutGen(shortcutKeys)
	 
}

function shortcutGen(templateList) {
	templateList.forEach((item) => {
		shortcutCont.innerHTML += `
		<div class="shortcut" data-key=${item.title}>
        <img src=${item.icon} alt="">
        <div class="title">
          <a href=${item.link}>${item.title}</a>
        </div>
      </div>`
	})
}
console.log(localStorage.getItem('shortcutKeys'))
/* 

 */