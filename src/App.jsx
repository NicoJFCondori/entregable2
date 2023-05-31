import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import getApiKey from './utils/getApiKey'
import Loading from './components/Loading'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  useEffect(() => {
    const success = pos => {
      const obj = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${getApiKey()}`
    axios.get(url)
    .then(res => {
      setWeather(res.data)
      const objTemp = {
        celsius: (res.data.main.temp - 273.15).toFixed(1),
        farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
      }
      setTemp(objTemp)
    })
    .catch(err => console.log(err)) 
  }
  },[coords])

  console.log(weather)


  return (

    <div className='app'>

      {weather
      ? <WeatherCard 
          weather={weather}
          temp= {temp}
      />
      : <Loading/>
      }
    </div>
  )
}

export default App
