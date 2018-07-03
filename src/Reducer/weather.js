import {OrderedMap, Record} from 'immutable';

import {
    ADD_CITY, DELETE_CITY, START,
    SUCCESS, FAIL, NOT_FOUND,
    CITY_ADDED, RESET_FAIL
} from '../constants';
import {arrToMap} from '../helpers';

const CityRecord = Record({
    id: undefined,
    name: undefined,
    main: undefined,
    weather: undefined
});

const ReducerState = Record({
    isLoading: false,
    fail: null,
    cities: arrToMap(JSON.parse(localStorage.getItem('cities')), CityRecord)
});

const defaultState = new ReducerState();

export default (weatherState = defaultState, actionTypeResponse) => {
    const {type, response: data, id: cityId} = actionTypeResponse;
    switch (type) {
        case ADD_CITY + START: {
            return weatherState.set('isLoading', true)
                .set('fail', null);
        }
        case ADD_CITY + SUCCESS: {
            let arr = [];
            arr.push(data);
            arr = arrToMap(arr, CityRecord);
            arr = weatherState.cities.concat(arr);
            if (weatherState.cities.get(data.id)) {
                return weatherState.set('fail', CITY_ADDED)
                    .set('isLoading', false);
            }
            return weatherState.set('cities', arr)
                .set('fail', null)
                .set('isLoading', false);
        }
        case ADD_CITY + FAIL: {
            if (data.status === 404) {
                return weatherState.set('fail', NOT_FOUND)
                    .set('isLoading', false);
            }
            break;
        }
        case DELETE_CITY: {
            return weatherState.deleteIn(['cities', cityId]);
        }
        case RESET_FAIL: {
            return weatherState.set('fail', null);
        }
    }
    return weatherState;
}