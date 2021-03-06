import React from 'react';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames/bind';

import {deleteCity} from '../../AC/city';
import {getCityTemp} from '../../helpers';
import styles from './styles.scss';

const cx = classNames.bind(styles);

class City extends React.Component {

    deleteCity = cityId => () => this.props.deleteCity(cityId);

    render() {
        const {city} = this.props;
        return (
            <div className={cx('weather')}>
                <h3>{city.name}</h3>
                <div>{getCityTemp(city.main.temp)} ℃</div>
                <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}/>
                <button onClick={this.deleteCity(city.id)}
                        className={cx('delete-weather-btn')}>DELETE</button>
            </div>
        )
    }
}

export default connect(null, {deleteCity})(City);