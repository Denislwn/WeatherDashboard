import {combineEpics} from 'redux-observable';

import {addCity} from './addCity';

export default combineEpics(
    addCity
);