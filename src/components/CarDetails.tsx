import React from 'react';
import Car from '../classes/Car'
import carsStore from '../stores/CarsStore'
import '../styles/car-details.css'
import { RouteComponentProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';


interface CarsDetailsState {
    currentCar?: Car
}

interface MatchParams {
    id: string
}

interface ParamProperties extends RouteComponentProps<MatchParams> {

}

class CarDetails extends React.Component<ParamProperties, CarsDetailsState> {
    constructor(props: ParamProperties) {
        super(props);
        this.findCurrentCar();
    }

    findCurrentCar = () => {
        let savedCar = localStorage.getItem('current_car');

        if (savedCar) {
            let carObject = JSON.parse(savedCar);
            
            if (carObject.id === this.props.match.params.id) {
                this.state = { currentCar: carObject };
            }
            else {
                this.setInitialState();
            }
        } else {
            this.setInitialState();
        }
    }

    setInitialState = () => {
        this.state = { currentCar: undefined };
        this.setCurrentCar();
    }

    setCurrentCar = () => {
        let carID = this.props.match.params.id;

        carsStore.getCars()
            .then(function (result: Car[] | undefined) {
                if (result) {
                    let car = result.find(d => d.id === carID);
                    localStorage.setItem('current_car', JSON.stringify(car));
                    window.location.reload();
                }
            });
    }

    render() {
        return this.productDetailsHtml();
    }

    productDetailsHtml = () => {
        if (this.state && !this.state.currentCar)
            return <div> </div>;

        return (
            <div>
                <Navbar inputValue={() => (console.log("car-details"))} activeLink="Car details" />

                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>Product Details Page</h1>
                                <nav className="d-flex align-items-center">
                                    <Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
                                    <Link to={'/'} > Product Details</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="product_image_area">
                    <div className="container">
                        <div className="row s_product_inner">
                            <div className="col-lg-6">
                                <div className="car-image-container">
                                    <div className="details-image mt-5"><img src={require('../images/cars/' + this.state.currentCar?.id + '.' + this.state.currentCar?.imageType)} /></div></div>
                            </div>
                            <div className="col-lg-5 offset-lg-1">
                                <div className="s_product_text">
                                    <h3>{this.state.currentCar?.manufacturer + ' ' + this.state.currentCar?.model}</h3>
                                    <h2>{this.state.currentCar?.price}</h2>
                                    <ul className="list">
                                        <li><a className=""><span>Color:</span> <strong>{this.state.currentCar?.color}</strong></a></li>
                                        <li><a className=""><span>Horsepower:</span> <strong>{this.state.currentCar?.horsepower}</strong></a></li>
                                        <li><a className=""><span>Release Year:</span> <strong>{this.state.currentCar?.releaseYear}</strong></a></li></ul>
                                    <p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for
                                    something that can make your interior look awesome, and at the same time give you the pleasant warm feeling
							during the winter.</p>

                                    {localStorage.getItem('current_user') ?
                                        (<div className="card_area d-flex align-items-center" style={{ width: '180px' }}>
                                            <a className="primary-btn" href="#">Add to Cart</a>
                                        </div>) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>)
    }


}

export default CarDetails;