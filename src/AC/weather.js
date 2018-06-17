import {ADD_CITY, DELETE_CITY, RESET_FAIL} from '../constants';

export function addCity(cityName) {
    return {
        type: ADD_CITY,
        callAPI: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8e3145fe3bc2e2e42c29a6c323b46d41&units=metric`
    }
}

export function deleteCity(cityId) {
    return {
        type: DELETE_CITY,
        id: cityId
    }
}

export function resetFail() {
    return {
        type: RESET_FAIL
    }
}