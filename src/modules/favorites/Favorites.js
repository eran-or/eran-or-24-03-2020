import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLocationName, fetchLocationDetails, fetchCurrentWeather } from '../../actions'
import { Row, Box, CenterRow, DetailesBox } from '../../assets/styled-elements'
import { useHistory } from 'react-router-dom'

const Favorites = () => {
	const history = useHistory()
	const obj = useSelector(state => state.favorites)
	const temperatureUnit = useSelector(state => state.temperatureUnit)
	const dispatch = useDispatch()
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		(async () => {
			return Promise.all(Object.keys(obj).map(async locationKey => {
				let locationName, Temperature, weatherText
				return dispatch(fetchCurrentWeather(locationKey)).then(weather => {
					locationName = obj[locationKey]
					Temperature = weather[0].Temperature.Metric.Value
					weatherText = weather[0].WeatherText
					return { locationName, Temperature, weatherText, weatherIcon: weather[0].WeatherIcon }
				})
			})).then(res => {
				setFavorites(res)
			})
		})()
	}, [dispatch, obj])
	
	const handleClick = (name) => {
		dispatch(setLocationName(name))
		history.push('/')
	}

	return (
		favorites && <DetailesBox>
			<Row> {favorites.map((item, i) => {
				return <Box key={i} onClick={()=>handleClick(item.locationName)}>
					<div>{item.locationName}</div>
					<div>{Math.round(item.Temperature)} &#176; {temperatureUnit} </div>
					<img src={require(`../../assets/icons/weather/${item.weatherIcon}-s.png`)} alt="" />
					<div>{item.weatherText}</div>
				</Box>
			})}</Row>
		</DetailesBox>
	);
};

export default Favorites;