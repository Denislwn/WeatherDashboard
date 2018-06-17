import {SUCCESS, FAIL, START} from '../constants';

export default store => next => action => {
    const {callAPI, type} = action;
    if (!callAPI) {
        return next(action);
    }

    next({type: type + START});

    fetch(callAPI)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                return next({type: type + SUCCESS, data})
            } else {
                return next({type: type + FAIL, data});
            }
        });
}