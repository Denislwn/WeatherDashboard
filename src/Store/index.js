import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {ajax} from 'rxjs/ajax';

import reducer from '../Reducer';
import rootEpic from '../Epic';

const epicMiddleware = createEpicMiddleware({
    dependencies: {getJSON: ajax.getJSON}
});
const enhancer = applyMiddleware(epicMiddleware);

const store = createStore(reducer, {}, enhancer);

epicMiddleware.run(rootEpic);

export default store;