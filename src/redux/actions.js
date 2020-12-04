import api,{headers} from '../api';
export const fetchAllRestaurants = () => {
    return async (dispatch) => {
        const restaurants = await fetch(api("/get_restaurant"),{
            method: "GET",
            headers: headers,
        });

        dispatch({
            type: "GET_ALL_RESTAURANTS",
            payload: restaurants
        })
    }
}