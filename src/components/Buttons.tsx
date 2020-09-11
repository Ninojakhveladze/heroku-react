import React, { SyntheticEvent } from 'react';
import alertsHelper from '../helpers/alertsHelper'
import carsHelper from '../helpers/carsHelper'
import CarsStore from '../stores/CarsStore'
import { Link } from 'react-router-dom'

interface ButtonsState {
    searchFieldValue: string
}

interface ButtonsProps {
    checkButtonClick: (value: string) => void;
}

class Buttons extends React.Component<ButtonsProps> {
    state: ButtonsState = { searchFieldValue: '' }

    private _showAveragePrice = () => {
        let averagePrice = CarsStore.getAveragePrice();

        let message = alertsHelper.averagePriceMessage(averagePrice);

        alert(message);
    }

    private _highlightCarBy = (condition: string) => {
        carsHelper.disableAllBuyButtons();

        let chosenCarID = CarsStore.getCarIdBy(condition) || '';

        carsHelper.toggleBuyButtonVisibility(chosenCarID, false);
    }

    private _checkButtonAction = () => {
        this.props.checkButtonClick(this.state.searchFieldValue);
        this._searchResultAlert();
    }

    private _searchFieldChange = (event: SyntheticEvent) => {
        this.setState({
            searchFieldValue: (event.target as HTMLInputElement).value
        });
    }

    private _searchResultAlert() {
        let price = this.state.searchFieldValue;

        let priceAsNumber = parseInt(price);
        let validNumber = !isNaN(priceAsNumber);
        let alertText;

        let cars = CarsStore.getCarsList();

        if (validNumber) {
            let availableCars = carsHelper.getFilteredCars(cars, price);

            if (availableCars.length > 0) {
                alertText = carsHelper.availableCarsTextList(availableCars);
            } else {
                alertText = alertsHelper.carNotFoundWithinPrice();
            }
        }
        else {
            alertText = alertsHelper.incorrectPriceFormat();
        }

        alert(alertText);
    }

    render() {
        return (
            <div className='mt-5'>
                <form className='form-inline my-2 my-lg-0 text-center d-block'>
                    <button className='btn btn-outline-primary my-2 my-sm-0' id='average-price-btn' type='button'
                        onClick={this._showAveragePrice} >საშუალო ფასი</button>
                    <button id='expensive-car-highight' className='btn btn-outline-primary my-2 my-sm-0' type='button'
                        onClick={() => this._highlightCarBy('max_price')} > ყველაზე ძვირიანი მანქანა </button>
                    <button id="cheap-car-highight" className='btn btn-outline-primary my-2 my-sm-0' type='button'
                        onClick={() => this._highlightCarBy('min_price')}> ყველაზე იაფიანი მანქანა</button>
                    <input className='form-control mr-sm-2' type='text' placeholder='ფასი' aria-label='Search' id='price-input'
                        value={this.state.searchFieldValue} onChange={(e) => this._searchFieldChange(e)}></input>
                    <button id='searchResult' className='btn btn-outline-primary my-2 my-sm-0' type='button'
                        onClick={this._checkButtonAction} >შემოწმება</button>
                    <Link to={'login'}><button className='btn btn-outline-primary my-2 my-sm-0'>შესვლა</button></Link>
                    <Link to={'registration'}><button className='btn btn-outline-primary my-2 my-sm-0'>რეგისტრაცია</button></Link>
                </form>
            </div>
        )
    }
}

export default Buttons;