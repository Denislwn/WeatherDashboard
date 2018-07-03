import React from 'react';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames/bind';

import City from '../City';
import {getCitiesSelector} from '../../selectors/citiesSelector';
import styles from './styles.scss';

const cx = classNames.bind(styles);

class CitiesList extends React.Component {

    closeListener = () => {
        const {cities} = this.props;
        localStorage.setItem('cities', JSON.stringify(cities));
    };

    componentWillMount() {
        window.addEventListener('beforeunload', this.closeListener);
    }

    getCitiesList = (cities) => {
        let citiesList;
        if (cities.length > 0) {
            citiesList = cities.map(city => (
                    <City key={city.id}
                          city={city}/>
                )
            );
        } else {
            citiesList = <div className={cx('dashboard-placeholder')}>Dashboard is empty</div>;
        }
        return citiesList;
    };

    render() {
        const {cities} = this.props;
        const citiesList = this.getCitiesList(cities);

        return (
            <div className={cx('dashboard')}>
                {citiesList}
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.closeListener);
    }
}

export default connect(state => ({
    cities: getCitiesSelector(state)
}))(CitiesList);