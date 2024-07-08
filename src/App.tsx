// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';

function App() {

	let [indicators, setIndicators] = useState<JSX.Element[]>([])
	let [rowsTable, setRowsTable] = useState([])

	useEffect(() => {

		(async () => {

			// let API_KEY = "c4ed95cc20d66697b454863af35cf095"
			// let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
			// let savedTextXML = await response.text();

			let savedTextXML = localStorage.getItem("openWeatherMap")
			let expiringTime = localStorage.getItem("expiringTime")

			let nowTime = (new Date()).getTime()

			if(expiringTime === null || nowTime > parseInt(expiringTime)) {
				let API_KEY = "c4ed95cc20d66697b454863af35cf095"
				let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
				let savedTextXML = await response.text();

				let hours = 1
				let delay = hours * 3600000

				localStorage.setItem("openWeatherMap", savedTextXML)
				localStorage.setItem("expiringTime", (nowTime + delay).toString())
			}

			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML, "application/xml")

			let location = xml.getElementsByTagName("location")[1]

			let dataToIndicators = new Array()

			let geobaseid = location.getAttribute("geobaseid")
			dataToIndicators.push(["Location", "geobaseid", geobaseid])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push(["Location", "Latitude", latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push(["Location", "Longitude", longitude])

			console.log(dataToIndicators)

			let indicatorElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]}/>
			)

			setIndicators(indicatorElements)

			let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
				let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]
				let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " "+  timeElement.getElementsByTagName("windDirection")[0].getAttribute("code") 
				
				return { "rangeHours": rangeHours,"windDirection": windDirection }
			})

			arrayObjects = arrayObjects.slice(0,8)

			setRowsTable(arrayObjects)
		})()

	}, [])


	return (
		<>
			<Grid container spacing={5}>
				<Grid xs={12} sm={6} md={4} lg={2}>
					{indicators[0]}
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					{indicators[1]}
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					{indicators[2]}
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					<Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={2}>
					<Summary></Summary>
				</Grid>
				<Grid xs={12} sm={8} md={8} lg={10}>
					<BasicTable rows={rowsTable}></BasicTable>
				</Grid>
				<Grid xs={12} lg={2}>
					<ControlPanel></ControlPanel>
				</Grid>
				<Grid xs={12} lg={10}>
					<WeatherChart></WeatherChart>
				</Grid>
			</Grid>
		</>
	)
}

export default App
