import React, { SyntheticEvent } from "react";

import "../styles/linearicons.css"
import "../styles/font-awesome.min.css"
import "../styles/themify-icons.css"
import "../styles/bootstrap.css"
import "../styles/owl.carousel.css"
import "../styles/nice-select.css"
import "../styles/nouislider.min.css"
import "../styles/ion.rangeSlider.css"
import "../styles/ion.rangeSlider.skinFlat.css"
import "../styles/magnific-popup.css"
import "../styles/main.css"

class Banner extends React.Component {
    render() {
        return this.getBannerHtml();
    }

    getBannerHtml = () => {
        return (
            <section className="banner-area">
                <div className="container">
                    <div className="row fullscreen align-items-center justify-content-start">
                        <div className="col-lg-12">
                            <div className="active-banner">
                                <div className="row single-slide align-items-center d-flex">
                                    <div className="col-lg-5 col-md-6">
                                        <div className="banner-content">
                                            <h1>New Car <br />Collection!</h1>
                                            <p>Welcome to our website, find out best deals through our platform. Choose from wide variety of cars and make your life more comfortable.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="banner-img">
                                            <img className="img-fluid" src={require('../images/general/bmw.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Banner;