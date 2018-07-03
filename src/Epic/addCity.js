import {ofType} from 'redux-observable';
import {of} from 'rxjs';
import {mergeMap, debounceTime, map, catchError, startWith} from 'rxjs/operators';

import {ADD_CITY, FAIL, SUCCESS, START} from '../constants';

export const addCity = (action$, state$, {getJSON}) => {
    return action$.pipe(
        ofType(ADD_CITY),
        debounceTime(300),
        mergeMap(action =>
            getJSON(action.callAPI).pipe(
                map(response => ({type: ADD_CITY + SUCCESS, response})),
                catchError(error => of({type: ADD_CITY + FAIL, response: error}))
            ).pipe(startWith({type: ADD_CITY + START}))
        ));
};