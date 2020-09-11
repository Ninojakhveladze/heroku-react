import React from 'react';
import Car from '../classes/Car'
import { Link } from 'react-router-dom'

interface CarProperties {
    car: Car,
    disableButton: boolean
}

class CarItem extends React.Component<CarProperties> {
    render() {
        return this.singleCarHtml();
    }

    singleCarHtml = () => {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="single-product">
                    <img className="img-fluid" src={require('../images/cars/' + this.props.car.id + '.' + this.props.car.imageType)}
                        alt="" />
                    <div className="product-details">
                        <h6>{this.props.car.manufacturer + ' ' + this.props.car.model}</h6>
                        <div className="price">
                            <h6>{this.props.car.price}</h6>
                            <h6 className="l-through">{this.props.car.oldPrice}</h6>
                        </div>
                        <div className="prd-bottom">
                            {localStorage.getItem('current_user') ?
                                (<a href="" className="social-info">
                                    <span className="ti-bag"></span>
                                    <p className="hover-text">add to cart</p>
                                </a>) : ''}

                            <Link to={'details/' + this.props.car.id} className="social-info">
                                <span className="lnr lnr-move"></span>
                                <p className="hover-text">view more</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarItem;