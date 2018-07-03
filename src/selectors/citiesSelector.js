import {createSelector} from 'reselect';
import {mapToArr} from '../helpers';

const citiesGetter = state => state.cities.cities;

export const getCitiesSelector = createSelector(citiesGetter, cities => {
    return mapToArr(cities);
});