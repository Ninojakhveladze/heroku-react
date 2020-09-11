import React, { SyntheticEvent } from "react";
import userHelper from '../helpers/usersHelper';
import alertsHelper from '../helpers/alertsHelper';
import userStore from '../stores/UsersStore';
import User from '../classes/User';
import '../styles/registration.css'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import UsersStore from "../stores/UsersStore";
import swal from 'sweetalert'

interface RegistrationState {
    usernameInputValue: string,
    emailInputValue: string,
    passwordInputValue: string,
    validationsPassed: boolean
}

export default class RegistrationPage extends React.Component<RegistrationState> {
    state: RegistrationState = { usernameInputValue: '', emailInputValue: '', passwordInputValue: '', validationsPassed: false }

    private _usernameChange = (event: SyntheticEvent) => {
        this.setState({
            usernameInputValue: (event.target as HTMLInputElement).value
        });
    }

    private _emailChange = (event: SyntheticEvent) => {
        this.setState({
            emailInputValue: (event.target as HTMLInputElement).value
        });
    }

    private _passwordChange = (event: SyntheticEvent) => {
        this.setState({
            passwordInputValue: (event.target as HTMLInputElement).value
        });
    }

    private _registerButtonAction = (event: SyntheticEvent) => {
        event.preventDefault();
        let currentState = this.state;
        let registrationMessageFunction = this._getRegistrationMessage;
        let showRegistrationMessageFunction = this._showRegistrationResultMessage;

        userStore.getUsers().then(function (allUsers) {
            let fieldIsEmpty = userHelper.checkField(currentState.usernameInputValue, currentState.emailInputValue, currentState.passwordInputValue);
            let usernameFound = userHelper.checkUsername(allUsers, currentState.usernameInputValue);
            let emailValid = userHelper.checkEmail(currentState.emailInputValue)
            let emailFound = userHelper.checkEmailExistence(allUsers, currentState.emailInputValue);
            let passwordValid = userHelper.checkPasswordStrength(currentState.passwordInputValue)
            let registrationResult = registrationMessageFunction(fieldIsEmpty, usernameFound, emailValid, emailFound, passwordValid);

            if (registrationResult.validationsPassed) {
                let newUser = {
                    username: currentState.usernameInputValue,
                    email: currentState.emailInputValue,
                    password: currentState.passwordInputValue,
                    balance: Math.floor(Math.random() * 300000) + 5000
                };

                UsersStore.addUser(newUser).then(function (successfullyAddedUser) {
                    if (successfullyAddedUser){
                        localStorage.setItem('current_user', JSON.stringify(successfullyAddedUser));
                        showRegistrationMessageFunction(true, registrationResult.message);
                    }
                    else
                        showRegistrationMessageFunction(false, alertsHelper.errorInRegistration());
                });
            }
            else
                showRegistrationMessageFunction(false, registrationResult.message);
        });
    }

    private _showRegistrationResultMessage = (success: boolean, message: string) => {
        this._showAlert(success ? 'Success' : 'Error', message, success ? 'success' : 'error', success);
    }

    private _setRegistrationState = (signed: boolean) => {
        this.setState({
            validationsPassed: signed
        });
    }

    private _showAlert = (title: string, content: string, icon: string, successfullRegister: boolean) => {
        let setRegistrationStateFunction = this._setRegistrationState;
    
        swal({ title: title, text: content, icon: icon })
          .then(() => {
            setRegistrationStateFunction(successfullRegister);
          });
      }

    private _getRegistrationMessage(fieldIsEmpty: boolean, usernameFound: User | undefined, isCorrectEmail: boolean, emailFound: User | undefined, passwordIsStrong: boolean) {
        let message;
        let validationsPassed = false;

        if (fieldIsEmpty) { message = alertsHelper.fillInputErrorMessage(); }
        else if (usernameFound) { message = alertsHelper.userAlreadyExistsMessage(); }
        else if (!isCorrectEmail) { message = alertsHelper.incorrectEmailFormat(); }
        else if (emailFound) { message = alertsHelper.emailAlreadyExistsMessage(); }
        else {
            message = alertsHelper.successRegisterMessage();
            validationsPassed = true;
        }

        return {
            message: message,
            validationsPassed: validationsPassed
        };
    }

    render() {
        if (this.state.validationsPassed) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <Navbar inputValue={() => (console.log("Login"))} activeLink="Register" />
                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>Registration</h1>
                                <nav className="d-flex align-items-center">
                                    <Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
                                    <Link to={'/registration'} >Registration </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="login-form-inner">
                    <h5>დარეგისტრირდი მარტივად</h5>
                    <form className="login-form">
                        <div className="col-md-12 form-group">
                            <input type="text" className="form-control shadow-none" placeholder="სახელი"
                                value={this.state.usernameInputValue} onChange={(e) => this._usernameChange(e)}></input>
                        </div>
                        <div className="col-md-12 form-group">
                            <input type="text" className="form-control shadow-none" placeholder="იმეილი"
                                value={this.state.emailInputValue} onChange={(e) => this._emailChange(e)}></input>
                        </div>
                        <div className="col-md-12 form-group">
                            <input type="password" className="form-control shadow-none" placeholder="პაროლი"
                                value={this.state.passwordInputValue} onChange={(e) => this._passwordChange(e)}></input>
                        </div>
                        <div className="orng-btn">
                            <button type="submit" value="submit" className="primary-btn" onClick={(e) => this._registerButtonAction(e)}>რეგისტრაცია</button>
                        </div>
                    </form>
                </div>

                <Footer />
            </div>
        )
    }
}