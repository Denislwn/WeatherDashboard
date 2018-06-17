import React from 'react'
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames/bind';

import City from '../City';
import {mapToArr} from '../../helpers';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class CitiesList extends React.Component {
    citiesList;

    render() {
        let {cities} = this.props;
        if (cities.length > 0) {
            this.citiesList = cities.map(city => {
                    return <City key={city.id} city={city}/>
                }
            );
        } else {
            this.citiesList = <div className={cx('dashboard-placeholder')}>Dashboard is empty</div>;
        }
        return (
            <div className={cx('dashboard')}>
                {this.citiesList}
            </div>
        );
    }
}

export default connect(state => ({
    cities: mapToArr(state.cities.cities)
}))(CitiesList);