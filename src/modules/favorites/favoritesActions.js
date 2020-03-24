import { UPDATE_FAVORITES } from '../../actions/actionTypes'

export const updateFavorites = (locationKey, locationName, command) => ({
    type: UPDATE_FAVORITES,
    locationKey,
    locationName,
    command
})