import {Record} from 'immutable';

import {ADD_CITY, DELETE_CITY, START, SUCCESS, END_LOADING} from '../constants';
import {arrToMap} from '../helpers';

const CityRecord = Record({
    id: undefined,
    name: undefined,
    main: undefined,
    weather: undefined
});

const ReducerState = Record({
    isLoading: false,
    cities: arrToMap(JSON.parse(localStorage.getItem('cities')), CityRecord)
});

const defaultState = new ReducerState();

export default (weatherState = defaultState, actionTypeResponse) => {
    const {type, response: data, id: cityId} = actionTypeResponse;
    switch (type) {
        case ADD_CITY + START: {
            return weatherState.set('isLoading', true);
        }
        case ADD_CITY + SUCCESS: {
            let arr = [];
            arr.push(data);
            arr = arrToMap(arr, CityRecord);
            arr = weatherState.cities.concat(arr);
            return weatherState.set('cities', arr)
                .set('isLoading', false);
        }
        case END_LOADING: {
            return weatherState.set('isLoading', false);
        }
        case DELETE_CITY: {
            return weatherState.deleteIn(['cities', cityId]);
        }
    }
    return weatherState;
}