import React from 'react';
import classNames from 'classnames/bind';

import AddCity from './AddCity';
import CitiesList from './CitiesList';
import styles from './styles.scss';

let cx = classNames.bind(styles);

export default class extends React.Component {

    render() {
        return (
            <div className={cx('dashboard-container')}>
                <AddCity/>
                <CitiesList/>
            </div>
        )
    }
}
