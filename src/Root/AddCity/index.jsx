import React from 'react';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames/bind';

import {addCity, resetFail} from '../../AC/city';
import {NOT_FOUND, CITY_ADDED} from '../../constants';
import styles from './styles.scss';

const cx = classNames.bind(styles);

class AddCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityName: ''
        }
    }

    handleChangeCityName = event => {
        const inputValue = event.target.value;
        if (/^[a-zA-Z0-9]+$|^$/.test(inputValue)) {
            this.setState({cityName: inputValue});
            this.resetFailErr();
        }
    };

    handleClearInputField = () => {
        this.setState({cityName: ''});
        this.resetFailErr();
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addCity(this.state.cityName);
    };

    addButtonValid = () => this.state.cityName ? null : true;

    getClearButton() {
        if (this.state.cityName) {
            return <button onClick={this.handleClearInputField}
                           className={cx('delete-btn')}>Clear</button>;
        }
    }

    getMessage() {
        const {fail, isLoading} = this.props;
        if (fail === NOT_FOUND) {
            return <div className={cx('error-text')}>This city doesn't exist</div>;
        } else if (fail === CITY_ADDED) {
            return <div className={cx('error-text')}>This city is already in the list</div>;
        }
        if (isLoading) {
            return (
                <img src="../../images/spinner.svg"
                     className={cx('message-container')}/>
            )
        }
    }

    getBtnClass = () => this.state.cityName ? 'active-btn' : 'disabled-btn';

    resetFailErr() {
        const {fail} = this.props;
        if (fail) {
            this.props.resetFail();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  className={cx('add-city-form')}>
                <input type="text"
                       placeholder="Enter city name"
                       className={cx('input-field')}
                       value={this.state.cityName}
                       onChange={this.handleChangeCityName}/>
                <button type='submit'
                        className={cx(this.getBtnClass())}
                        disabled={this.addButtonValid()}>Add
                </button>
                {this.getClearButton()}
                <div className={cx('message-container')}>
                    {this.getMessage()}
                </div>
            </form>
        );
    }
}

export default connect(state => ({
    fail: state.cities.fail,
    isLoading: state.cities.isLoading
}), {addCity, resetFail})(AddCity);