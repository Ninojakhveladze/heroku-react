import React, { SyntheticEvent, ChangeEvent } from 'react'
import Select from 'react-select'
import Car from '../classes/Car'
import CarItem from './CarItem'

interface CarsListState {
    cars: Car[],
    generalCarColors: string[],
    generalCarManufacturers: string[],
    secondCarList: Car[],
    inputValue: string,
}

interface CarsListProps {
    inputValue: string
}

const sortOptions = [
    {
        value: "asc",
        label: "Sort By Price Asc"
    },
    {
        value: "desc",
        label: "Sort By Price Desc"
    },
    {
        value: "dateAsc",
        label: "Sort By Date Asc"
    },
    {
        value: "dateDesc",
        label: "Sort By Date Desc"
    },
]

const showOptions = [
    {
        value: 1,
        label: "Show 6"
    },
    {
        value: 2,
        label: "Show 12"
    },
    {
        value: 3,
        label: "Show All"
    },
]

class CarsList extends React.Component<CarsListProps> {

    state: CarsListState = {
        cars: [],
        generalCarColors: [],
        generalCarManufacturers: [],
        secondCarList: [],
        inputValue: ""
    }

    private _setColor = (carData: Car[]) => {
        let colorArray: string[] = [];

        for (let i = 0; i < carData.length; i++) {
            if (colorArray.indexOf(carData[i].color) < 0) {
                colorArray.push(carData[i].color);
            }
        }

        this.setState({
            generalCarColors: colorArray,
        });
    }

    private _setManufacturer = (carData: Car[]) => {
        let manufacturerArray: string[] = [];

        for (let i = 0; i < carData.length; i++) {
            if (manufacturerArray.indexOf(carData[i].manufacturer) < 0) {
                manufacturerArray.push(carData[i].manufacturer);
            }
        }

        this.setState({
            generalCarManufacturers: manufacturerArray,
        });
    }

    componentDidMount = () => {
        let setCarsFunction = this.setCars;
        let setColors = this._setColor;
        let setManufacturer = this._setManufacturer;

        fetch('http://localhost:3000/cars')
            .then(response => response.json())
            .then(function (data) {
                setCarsFunction(data);
                setColors(data);
                setManufacturer(data);
            })
            .catch(function (error) {
                console.log('error - ' + error);
            });

        this.listenPriceFilterChange();
    }

    listenPriceFilterChange = () => {
        let latestStateFunction = this.getLatestState;
        let setCurrentCarsFunction = this.setCurrentCars;

        jQuery("body").on('DOMSubtreeModified', "#lower-value", function () {
            let latestState = latestStateFunction();
            let currentCars = latestState.secondCarList;
            let currentMinValue = isNaN(parseInt(this.innerText)) ? 0 : parseInt(this.innerText);
            let currentMaxValue = parseInt(document.getElementById('upper-value')?.innerText || '0');

            if (isNaN(currentMaxValue))
                currentMaxValue = 0;

            let filteredCars = currentCars.filter(d => parseInt(d.price) >= currentMinValue && parseInt(d.price) <= currentMaxValue);

            setCurrentCarsFunction(filteredCars);
        });

        jQuery("body").on('DOMSubtreeModified', "#upper-value", function () {
            let latestState = latestStateFunction();
            let currentCars = latestState.secondCarList;
            let currentMinValue = parseInt(document.getElementById('lower-value')?.innerText || '0');

            if (isNaN(currentMinValue))
                currentMinValue = 0;

            let currentMaxValue = isNaN(parseInt(this.innerText)) ? 0 : parseInt(this.innerText);

            let filteredCars = currentCars.filter(d => parseInt(d.price) >= currentMinValue && parseInt(d.price) <= currentMaxValue);

            setCurrentCarsFunction(filteredCars);
        });
    }

    getLatestState = () => {
        return this.state;
    }

    setCurrentCars = (cars: Car[]) => {
        this.setState({
            cars: cars
        });
    }

    setCars = (cars: Car[]) => {
        this.setState({
            cars: cars,
            secondCarList: cars,
        });
    }

    _disabled = (carPrice: string, userPrice: string) => {
        let carPriceNumber = parseInt(carPrice);
        let inputPriceNumber = parseInt(userPrice);

        if (isNaN(carPriceNumber) || isNaN(inputPriceNumber)) return false;

        return carPriceNumber > inputPriceNumber;
    }
    // private _sortCars: ((event: ChangeEvent<HTMLSelectElement>) => void) | undefined

    render() {
        return this.getCarsListHtml();
    }

    private _setCountedManufacturer = (manufacturer: string) => {
        let carList = this.state.secondCarList;
        let counter = 0;

        for (let i = 0; i < carList.length; i++) {
            if (carList[i].manufacturer === manufacturer) {
                counter += 1;
            }
        }

        return counter;
    }

    private _setCountedColor = (color: string) => {
        let carList = this.state.secondCarList;
        let counter = 0;

        for (let i = 0; i < carList.length; i++) {
            if (carList[i].color === color) {
                counter += 1;
            }
        }

        return counter;
    }

    private _resetCarList = () => {
        this.setState({
            cars: this.state.secondCarList,
        });
    }

    private _getCarWithColor = (color: string) => {
        let carList = this.state.secondCarList;
        let empty: Car[] = [];

        for (let i = 0; i < carList.length; i++) {
            if (carList[i].color === color) {
                let emptyColorArray: Car[] = [];
                let carList = this.state.secondCarList;

                for (let i = 0; i < carList.length; i++) {
                    if (carList[i].color === color) {
                        emptyColorArray.push(carList[i]);
                    } else {
                        empty.push(carList[i]);
                    }
                }

                this.setState({
                    cars: emptyColorArray
                });

                break;
            }
        }
    }

    private _getCarWithManufacturer = (manufacturer: string) => {
        this._resetCarList();
        let emptyManufacturerArray: Car[] = [];
        let carList = this.state.secondCarList;

        for (let i = 0; i < carList.length; i++) {
            if (carList[i].manufacturer === manufacturer) {
                emptyManufacturerArray.push(carList[i]);
            }
        }

        this.setState({
            cars: emptyManufacturerArray,
        });
    }

    _sortCars = (selectedValue: any) => {
        let cars = this.state.secondCarList;
        if (selectedValue.value === "asc") {
            cars.sort(function (a, b) {
                return parseInt(a.price) - parseInt(b.price);
            });
            cars.reverse();
        } else if (selectedValue.value === "desc") {
            cars.sort(function (a, b) {
                return parseInt(a.price) - parseInt(b.price);
            });
        } else if (selectedValue.value === "dateAsc") {
            cars.sort(function (a, b) {
                return a.releaseYear - b.releaseYear;
            });
            cars.reverse();
        } else if (selectedValue.value === "dateDesc") {
            cars.sort(function (a, b) {
                return a.releaseYear - b.releaseYear;
            });
        }

        this.setState({
            cars: cars,
        });
    }

    _showCarsFilter = (selectedValue: any) => {
        let cars = this.state.secondCarList;
        let emptyArray: Car[] = [];

        if (selectedValue.value === 1 && cars.length > 6) {
            for (let i = 0; i < 6; i++) {
                emptyArray.push(cars[i]);
            }
        } else if (selectedValue.value === 2 && cars.length > 12) {
            for (let i = 0; i < 12; i++) {
                emptyArray.push(cars[i]);
            }
        } else if (cars.length < 6 || cars.length < 12 || selectedValue.value === 3) {
            for (let i = 0; i < cars.length; i++) {
                emptyArray.push(cars[i]);
            }
        }

        this.setState({
            cars: emptyArray
        });
    }

    private search = (event: SyntheticEvent) => {
        let inputValue = (event.target as HTMLInputElement).value;
        inputValue = inputValue.toLowerCase();
        if (inputValue !== "") {
            let cars = this.state.secondCarList;
            let emptyArray: Car[] = [];

            for (let i = 0; i < cars.length; i++) {
                cars[i].manufacturer = cars[i].manufacturer.toLowerCase();
                if (cars[i].manufacturer.indexOf(inputValue) === 0) {
                    emptyArray.push(cars[i]);
                }
            }

            this.setState({
                cars: emptyArray,
            });
        } else {
            this.setState({
                cars: this.state.secondCarList,
            });
        }
    }

    getCarsListHtml = () => {
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="sidebar-filter mt-50">
                            <div className="top-filter-head">Car Filters</div>
                            <div className="common-filter">
                                <div className="head">Brands</div>
                                <form action="#">
                                    <ul>
                                        {this.props.inputValue}
                                        <li className="filter-list"><code><input onClick={this._resetCarList} name="carManufacturer" className="pixel-radio" type="radio" id="x" /><label htmlFor="x">None</label></code></li>
                                        {this.state.generalCarManufacturers.map((car, i) => <li onClick={() => this._getCarWithManufacturer(car)} key={i} className="filter-list"><input name="carManufacturer" className="pixel-radio" type="radio" id={car} /><label htmlFor={car}>{car}<span>({this._setCountedManufacturer(car)})</span></label></li>)}
                                    </ul>
                                </form>
                            </div>
                            <div className="common-filter">
                                <div className="head">Color</div>
                                <form action="#">
                                    <ul>
                                        <li className="filter-list" ><code><input onClick={this._resetCarList} name="carColor" className="pixel-radio" type="radio" id="x2" /><label htmlFor="x2">None</label></code></li>
                                        {this.state.generalCarColors.map((color, i) => <li onClick={() => this._getCarWithColor(color)} key={i} className="filter-list"><input className="pixel-radio" name="carColor" type="radio" id={color} /><label htmlFor={color}>{color}<span> ({this._setCountedColor(color)})</span></label></li>)}
                                    </ul>
                                </form>
                            </div>
                            <div className="common-filter">
                                <div className="head">Price</div>
                                <div className="price-range-area">
                                    <div id="price-range"></div>
                                    <div className="value-wrapper d-flex">
                                        <div className="price">Price:</div>
                                        <span>$</span>
                                        <div id="lower-value"></div>
                                        <div className="to">to</div>
                                        <span>$</span>
                                        <div id="upper-value" ref="higher-val"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">
                        <div className="filter-bar d-flex flex-wrap align-items-center">
                            <div className="sorting w-25">
                                <Select
                                    className="w-100"
                                    placeholder="Sort by"
                                    options={sortOptions}
                                    onChange={this._sortCars.bind(this)}
                                />
                            </div>
                            <div className="sorting mr-auto w-25">
                                <Select
                                    className="w-100"
                                    placeholder="Show All"
                                    options={showOptions}
                                    onChange={this._showCarsFilter.bind(this)}
                                />
                            </div>
                            <div className="sorting mr-auto">
                                <input type="text" onInput={(e) => this.search(e)} className="form-control text-white bg-dark border-0" id="search_input" placeholder="Search..." />
                            </div>
                        </div>
                        <section className="lattest-product-area pb-40 category-list">
                            <div className="row" id="cars-gallery-main">
                                {this.state.cars.map((car, i) => <CarItem key={i} car={car} disableButton={this._disabled(car.price, this.props.inputValue)} />)}
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        )
    }
}

export default CarsList;