import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './Store';

import Root from './Root';

ReactDOM.render((
    <Provider store={store}>
        <Root/>
    </Provider>
), document.getElementById('root'));