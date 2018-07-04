import {Record} from 'immutable';

import {
    ADD_CITY, CITY_ADDED, FAIL, INPUT_FILL,
    NOT_FOUND, RESET_FAIL, RESET_INPUT
} from '../constants';

const ReducerState = Record({
    text: '',
    fail: undefined
});

const defaultState = new ReducerState();

export default (inputState = defaultState, actionTypeResponse) => {
    const {type, text, response} = actionTypeResponse;
    switch (type) {
        case RESET_INPUT: {
            return inputState.set('text', '');
        }
        case INPUT_FILL: {
            return inputState.set('text', text);
        }
        case CITY_ADDED: {
            return inputState.set('fail', CITY_ADDED);
        }
        case ADD_CITY + FAIL: {
            if (response.status === 404) {
                return inputState.set('fail', NOT_FOUND);
            }
            break;
        }
        case RESET_FAIL: {
            return inputState.set('fail', null);
        }
    }
    return inputState;
}