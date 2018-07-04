import {combineReducers} from 'redux';

import cities from './weather';
import addCityInput from './addCityInput';

export default combineReducers({
    cities,
    addCityInput
});