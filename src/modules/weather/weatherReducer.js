import produce from "immer"
import { UPDATE_TEMPERATURE_UNIT, SET_LOCATION_NAME } from '../../actions/actionTypes'

export const weatherReducer = produce(
    (draft, action) => {
        switch (action.type) {
            case UPDATE_TEMPERATURE_UNIT:
                draft.temperatureUnit = action.temperatureUnit
                return
            case SET_LOCATION_NAME:
                draft.locationName = action.locationName
                return
            default:
                return draft
        }
    },{temperatureUnit: 'C', locationName: 'Tel-Aviv, IL'})