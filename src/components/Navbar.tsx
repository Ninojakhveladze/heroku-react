import React, { SyntheticEvent, useState } from "react"
import CarsList from './CarsList'
import { Link } from 'react-router-dom'
//import '../i18next';
//import { useTranslation } from 'react-i18next';
//import i18n from "../i18next";

interface NavbarProperties {
    activeLink: string,
    inputValue: (value: string) => void | undefined,
}

interface NavbarState {
    input: string,
}

class Navbar extends React.Component<NavbarProperties> {
    state: NavbarState = { input: "" };

    componentDidMount() {
        this.checkReload();
    }

    checkReload = () => {
        let key = 'page_reload_value';
        let pageReloaded = localStorage.getItem(key);

        if (!pageReloaded) {
            localStorage.setItem(key, 'true');
            window.location.reload();
        }
        else {
            localStorage.setItem(key, '');
        }
    }

    render() {
        return this.getNavbarHtml();
    }

    sendInputValue = (event: SyntheticEvent) => {
        let inputValue = (event.target as HTMLInputElement).value

        this.props.inputValue(inputValue);
    }

    //handleClick = (lang: any) => {

        //i18n.changeLanguage(lang);
    //}

    getNavbarHtml = () => {
        //const { t, i18n } = useTranslation();
        return (
            <header className="header_area sticky-header">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light main_box">
                        <div className="container">
                            <Link to={'/'} className="navbar-brand logo_h"><img src={require('../images/general/logo-alt-1.png')} alt="" />
                            </Link> 

                            {/* <button onClick={() => this.handleClick('en')}>
                             //   Eng
                            </button>
                            <button onClick={() => this.handleClick('geo')}>
                                ქარ
                            </button> */}
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                                <ul className="nav navbar-nav menu_nav ml-auto">
                                    <li className={this.props.activeLink === 'Home' ? 'nav-item active' : 'nav-item'}>
                                        <Link to={'/'} className="nav-link">
                                            <p>Home</p>
                                        </Link>
                                    </li>
                                    <li className={this.props.activeLink === 'About' ? 'nav-item active' : 'nav-item'}>
                                        <Link to={'/about'} className="nav-link">About</Link>
                                    </li>
                                    <li className={this.props.activeLink === 'Contact' ? 'nav-item active' : 'nav-item'}>
                                        <Link to={'/contact'} className="nav-link">Contact</Link>
                                    </li>
                                    {!localStorage.getItem('current_user') ?
                                        (<li className={this.props.activeLink === 'Login' ? 'nav-item active' : 'nav-item'}>
                                            <Link to={'/login'} className="nav-link">Login</Link>
                                        </li>) : ''
                                    }
                                    {!localStorage.getItem('current_user') ?
                                        (<li className={this.props.activeLink === 'Register' ? 'nav-item active' : 'nav-item'}>
                                            <Link to={'/registration'} className="nav-link">Register </Link>
                                        </li>) : ''
                                    }
                                </ul>
                                {localStorage.getItem('current_user') ?
                                    (<ul className="nav navbar-nav navbar-right">
                                        <li className="nav-item"><a href="#" className="cart"><span className="ti-bag"></span></a></li>
                                    </ul>) : ''
                                }
                            </div>

                        </div>
                    </nav>
                </div>

                <div className="search_input" id="search_input_box">
                    <div className="container">
                        <form className="d-flex justify-content-between">
                            <input type="text" className="form-control" id="search_input" onInput={(e) => this.sendInputValue(e)} placeholder="Search Here" />
                            <button type="submit" className="btn"></button>
                            <span className="lnr lnr-cross" id="close_search" title="Close Search"></span>
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;