import React,{useState, useEffect} from 'react'
import { Row, Box, CenterRow, DetailesBox, FavoritesButton } from '../../assets/styled-elements'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavorites } from '../../actions'
import srcUnFav from "../../assets/icons/unfav.svg"
import srcFav from "../../assets/icons/fav.svg"

const WeatherDetails = (props) => {
  const { currentWeather, forecast, locationKey } = props
  const { Temperature, weatherText, weatherIcon } = currentWeather
  const [existInFav, setExistInFav] = useState(false)
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites)
  const temperatureUnit = useSelector(state => state.weather.temperatureUnit)
  const locationName = useSelector(state => state.weather.locationName)
  
  useEffect(()=>{
    if(locationKey && favorites[locationKey]){
        setExistInFav(true)
      }else{
        setExistInFav(false)
      }
  }, [locationKey, favorites])
  const handleUpdateFavorites = () => {
    if(!favorites[locationKey]){
      dispatch(updateFavorites(locationKey, locationName, 'add'))
      setExistInFav(true)
    }else{
      dispatch(updateFavorites(locationKey, 'remove'))
      setExistInFav(false)
    }
  }
  return (
    Temperature ? <DetailesBox>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 22px' }}>
        <div>
          {weatherIcon && <img src={require(`../../assets/icons/weather/${weatherIcon}-s.png`)} alt="" />}
          <div>
            <div>{locationName}</div>
            <div>{Math.round(Temperature)} &#176; {temperatureUnit} </div>
          </div>
        </div>
        <FavoritesButton onClick={handleUpdateFavorites}>
          {<img width="24" height="32" src={existInFav? srcFav : srcUnFav} alt="" />}
          <div>Add To Favorites</div>
        </FavoritesButton>
      </div>
      <h3 style={{ textAlign: 'center' }}>{weatherText}</h3>
      <Row>
        {forecast.map((item, i) => {
          const d = new Date(item.Date)

          return (
            <Box key={i}>
              <header>{d.toDateString()}</header>
              <h5>Day</h5>
              <CenterRow>
                <img src={require(`../../assets/icons/weather/${item.Day.Icon}-s.png`)} alt="" />
                <div>{Math.round(item.Temperature.Maximum.Value)}&#176; / Hi</div>
              </CenterRow>

              <hr style={{ width: '80%' }} />
              <h5>Night</h5>
              <CenterRow>
                <img src={require(`../../assets/icons/weather/${item.Night.Icon}-s.png`)} alt="" />
                <div>{Math.round(item.Temperature.Minimum.Value)}&#176; / Lo</div>
              </CenterRow>
            </Box>

          )
        })}
      </Row>
    </DetailesBox> : <div style={{ fontSize: '18px', textAlign: 'center' }}>No Result</div>
  )
}

export default WeatherDetails;