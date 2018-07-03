import {OrderedMap} from 'immutable';

export function arrToMap(arr, DataRecord = OrderedMap) {
    return arr.reduce((acc, item) => acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}

export function getCityTemp(temp) {
    const cityTemp = Math.round(temp);
    return (cityTemp > 0) ? `+${cityTemp}` : cityTemp;
}