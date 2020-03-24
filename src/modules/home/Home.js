import React, { useEffect, useState } from 'react'
import Search from '../search/Search'
import WeatherDetails from '../weather/WeatherDetails'
import { setLocationName, fetchLocationDetails, fetchWeatherForecast, fetchCurrentWeather, fetchLocations } from '../../actions'
import { useDispatch, useSelector } from "react-redux"

const Home = (props) => {
  const dispatch = useDispatch()
  const locationName = useSelector(state => state.weather.locationName)
  const [forecast, setForecast] = useState([])
  const [currentWeather, setCurrentWeather ] = useState({})
  const [locationKey, setLocationKey] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=>{
    handleSearch(locationName)
  },[])
  const handleSearch = (value) => {
    setItems([])
    dispatch(fetchLocationDetails(value))
      .then(res => {
        dispatch(setLocationName(`${res[0].LocalizedName}, ${res[0].Country.ID}`))
        const locationKey = res[0].Key
        setLocationKey(locationKey)
        dispatch(fetchCurrentWeather(locationKey)).then(weather => {
          const Temperature = weather[0].Temperature.Metric.Value
          const weatherText = weather[0].WeatherText
          setCurrentWeather({Temperature, weatherText, weatherIcon: weather[0].WeatherIcon})
        })
        dispatch(fetchWeatherForecast(locationKey)).then(forecast => {
          setForecast(forecast.DailyForecasts)
        })
      })
  }

  const handleSearchChange = (value) => {
    dispatch(fetchLocations(value)).then(locations => {
      const itmes = locations.map(l => ({name:l.LocalizedName, key: l.Key, keyCode: l.Country.ID }))
      setItems(itmes)
    })
  }

  const handleSearchBlur = _ => {
    setItems([])
  }
  return (
    <div style={{padding:'18px 9px'}}>
      <Search onClick={handleSearch} defaultValue={locationName} items={items} onChange={handleSearchChange} onBlur={handleSearchBlur} />
      <WeatherDetails locationName={locationName} forecast={forecast} currentWeather={currentWeather} locationKey={locationKey} />
    </div>
  )
}

export default Home
