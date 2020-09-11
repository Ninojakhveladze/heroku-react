import React, { SyntheticEvent } from "react";
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/errorpage.css'

export default class ErrorPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar inputValue = {() => (console.log("Register"))} activeLink="Register" />
                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>404</h1>
                                <nav className="d-flex align-items-center">
                                    <Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
                                    <Link to={'/ErrorPage'} >Error </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="error-page">
                    <h4>Page not found, dont give up!</h4>
                </div>
                
                <Footer />
            </div>
        )
    }
}