import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {mergeMap, debounceTime, catchError, startWith} from 'rxjs/operators';

import {resetAddInput} from '../AC/addCityInput';
import {endCityLoading} from '../AC/city';
import {ADD_CITY, FAIL, SUCCESS, START, CITY_ADDED} from '../constants';

export const addCity = (action$, state$, {getJSON}) => {
    return action$.pipe(
        ofType(ADD_CITY),
        debounceTime(300),
        mergeMap(action =>
            getJSON(action.callAPI).pipe(
                mergeMap(response => {
                    if (state$.value.cities.cities.get(response.id)) {
                        return of({type: CITY_ADDED}, endCityLoading());
                    }
                    return of({type: ADD_CITY + SUCCESS, response}, resetAddInput());
                }),
                catchError(error => of({type: ADD_CITY + FAIL, response: error}, endCityLoading()))
            ).pipe(startWith({type: ADD_CITY + START}))
        ));
};