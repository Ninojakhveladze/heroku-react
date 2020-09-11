import Car from '../classes/Car'

//show each car title at the top of each image
function displayCarTitles(cars: Car[]) {
    for (let i = 0; i < cars.length; i++) {
        let containerDiv = document.getElementById(cars[i].id);
        let paragraphDiv = containerDiv!.querySelector('.car-title');
        paragraphDiv!.innerHTML = cars[i].manufacturer + ' ' + cars[i].model;
    }
}

//find cars under price
function getFilteredCars(cars: Car[], price: string) {
    let filteredCars = [];

    for (let i = 0; i < cars.length; i++) {
        let currentPrice = parseInt(cars[i].price);
        let inputPrice = parseInt(price);

        if (!isNaN(currentPrice) && !isNaN(inputPrice) && currentPrice <= inputPrice) {
            filteredCars.push(cars[i]);
        }
    }

    return filteredCars;
}

//generate text from cars
function availableCarsTextList(availableCars: Car[]) {
    let carInfo = 'ამ ფასად შეგიძლიათ შეიძინოთ: \n';

    for (let i = 0; i < availableCars.length; i++) {
        let currentCar = availableCars[i];
        carInfo += `${currentCar.manufacturer} ${currentCar.model} ${currentCar.price} \n`;
    }

    return carInfo;
}

//reusable function to disable all buy buttons
function disableAllBuyButtons() {
    let buyButtons = document.querySelectorAll('.buy-button');

    for (let i = 0; i < buyButtons.length; i++)
        (buyButtons[i] as HTMLButtonElement).disabled = true;
}


function highlightBuyButtons(availableCars: Car[]) {
    disableAllBuyButtons();

    for (let i = 0; i < availableCars.length; i++) {
        let currentCarID = availableCars[i].id;

        toggleBuyButtonVisibility(currentCarID, false);
    }
}

function toggleBuyButtonVisibility(carID: string, disable: boolean) {
    let chosenCarContainer = document.querySelector('#' + carID);

    (chosenCarContainer!.querySelector('.buy-button') as HTMLButtonElement)!.disabled = disable;
}

export default {
    displayCarTitles, getFilteredCars, availableCarsTextList, disableAllBuyButtons, highlightBuyButtons,
    toggleBuyButtonVisibility
}