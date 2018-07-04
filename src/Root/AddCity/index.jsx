import React from 'react';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames/bind';

import {addCity} from '../../AC/city';
import {inputFill, resetAddInput, resetFail} from '../../AC/addCityInput';
import {NOT_FOUND, CITY_ADDED} from '../../constants';
import styles from './styles.scss';

const cx = classNames.bind(styles);

class AddCity extends React.Component {

    handleChangeCityName = event => {
        const inputValue = event.target.value;
        if (/^[a-zA-Z0-9]+$|^$/.test(inputValue)) {
            this.props.inputFill(inputValue);
            this.resetFailErr();
        }
    };

    handleClearInputField = () => {
        this.props.resetAddInput();
        this.resetFailErr();
    };

    handleSubmit = event => {
        event.preventDefault();
        const {addCity, inputText} = this.props;
        addCity(inputText);
    };

    addButtonValid = () => this.props.inputText ? null : true;

    getClearButton() {
        const {inputText} = this.props;
        if (inputText) {
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

    getBtnClass = () => this.props.inputText ? 'active-btn' : 'disabled-btn';

    resetFailErr() {
        const {fail, resetFail} = this.props;
        if (fail)
            resetFail();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  className={cx('add-city-form')}>
                <input type="text"
                       placeholder="Enter city name"
                       className={cx('input-field')}
                       value={this.props.inputText}
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
    isLoading: state.cities.isLoading,
    fail: state.addCityInput.fail,
    inputText: state.addCityInput.text
}), {addCity, resetFail, inputFill, resetAddInput})(AddCity);