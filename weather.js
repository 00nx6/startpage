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
