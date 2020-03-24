import produce from "immer"
import { UPDATE_FAVORITES } from '../../actions/actionTypes'

export const favoritesReducer = produce(
    (draft, action) => {
        switch (action.type) {
            case UPDATE_FAVORITES:
                action.command === 'add'? 
                draft[action.locationKey] = action.locationName : delete draft[action.locationKey];
                return
            default:
                return draft
        }
    },{})