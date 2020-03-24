
import apiCall from '../../base/apiCall'
import apiKey from './apiKey'
import { SET_LOCATION_NAME } from '../../actions/actionTypes'

export const fetchLocationDetails = ( value ) => {
    let countryCode, city;
    try{
        const words = value.split(',')
        countryCode = words[1].trim()
        city = words[0].trim()
    }catch(e){
    }
    const url = `//dataservice.accuweather.com/locations/v1/cities/${countryCode}/autocomplete?apikey=${apiKey}&q=${city}`
    return apiCall('FETCH_LOCATION_DETAILS', url)
}

export const fetchCurrentWeather = locationKey => {
    const url = `//dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=false`
    return apiCall('FETCH_CURRENT_WEATHER', url)
} 

export const fetchWeatherForecast = locationKey => {
    const url = `//dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=false&metric=true`
    return apiCall('FETCH_WEATHER_FORECAST', url)
} 

export const fetchLocations = value => {
    const url = `//dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`
    return apiCall('FETCH_LOCATION_DETAILS', url)
}

export const setLocationName = locationName => ({
    type: SET_LOCATION_NAME,
    locationName
})
