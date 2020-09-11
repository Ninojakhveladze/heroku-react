import Car from '../classes/Car'
import axios from 'axios'

function getCarsList() {
    let porsche = new Car('porsche-1', 'Porsche', 'Panamera', 'black', 2020, '120000$', 330, 'jpg', '140000$');
    let mercedes = new Car('mercedes-1', 'Mercedes', 'S-Class', 'white', 2019, '94250$', 362, 'jpg', '120000$');
    let toyota = new Car('toyota-1', 'Toyota', 'Prius', 'blue', 2009, '5000$', 118, 'jpg', '20000$');
    let ford = new Car('ford-1', 'Ford', 'Fusion', 'gray', 2015, '32780$', 175, 'png', '');
    let honda = new Car('honda-1', 'Honda', 'Fit', 'silver', 2006, '3500$', 110, 'png', '15000$');

    return [porsche, mercedes, toyota, ford, honda];
}

function getCarIdBy(condition: string) {
    let cars = getCarsList();

    let chosenCar = cars[0];

    for (let i = 1; i < cars.length; i++) {
        let chosenCarPriceAsNumber = parseInt(chosenCar.price);
        let currentPriceAsNumber = parseInt(cars[i].price);
        let validPrices = !isNaN(chosenCarPriceAsNumber) && !isNaN(currentPriceAsNumber);

        if (!validPrices) return undefined;

        let searchCondition = condition === 'min_price' ? currentPriceAsNumber < chosenCarPriceAsNumber : currentPriceAsNumber > chosenCarPriceAsNumber

        if (searchCondition)
            chosenCar = cars[i];
    }

    return chosenCar.id;
}

function getAveragePrice() {
    let cars = getCarsList();

    let sum = 0;

    for (let i = 0; i < cars.length; i++) {
        let priceAsNumber = parseInt(cars[i].price);
        let validNumber = !isNaN(priceAsNumber);
        if (validNumber) sum = sum + priceAsNumber;
    }

    return sum / cars.length;
}

async function getCars() {
    return axios.get('http://localhost:3000/cars')
        .then(resp => {
            return resp.data;
        }).catch(error => {
            console.log('error - ' + error);
        });
}

export default { getCarsList, getCarIdBy, getAveragePrice, getCars }