import {INPUT_FILL, RESET_INPUT, RESET_FAIL} from '../constants';

export function inputFill(text) {
    return {
        type: INPUT_FILL,
        text
    }
}

export function resetAddInput() {
    return {
        type: RESET_INPUT
    }
}

export function resetFail() {
    return {
        type: RESET_FAIL
    }
}