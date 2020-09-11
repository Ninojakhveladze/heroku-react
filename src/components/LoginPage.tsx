import React, { SyntheticEvent } from "react";
import userHelper from '../helpers/usersHelper';
import alertsHelper from '../helpers/alertsHelper';
import userStore from '../stores/UsersStore';
import User from '../classes/User';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
import swal from 'sweetalert'

interface LoginState {
  usernameInputValue: string,
  emailInputValue: string,
  passwordInputValue: string,
  successfullLogin: boolean
}

export default class LoginForm extends React.Component<LoginState> {
  state: LoginState = { usernameInputValue: '', emailInputValue: '', passwordInputValue: '', successfullLogin: false }

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

  private _loginButtonAction = (event: SyntheticEvent) => {
    event.preventDefault();
    let currentState = this.state;
    let loginMessageFunction = this._getLoginMessage;
    let showAlertFunction = this._showAlert;

    userStore.getUsers().then(function (allUsers) {
      let fieldIsEmpty = userHelper.checkField(currentState.usernameInputValue, currentState.emailInputValue, currentState.passwordInputValue);
      let usernameFound = userHelper.checkUsername(allUsers, currentState.usernameInputValue);
      let emailValid = userHelper.checkEmail(currentState.emailInputValue)
      let passwordValid = userHelper.checkPasswordStrength(currentState.passwordInputValue)
      let userCheckResult = userHelper.checkUser(allUsers, currentState.usernameInputValue, currentState.emailInputValue, currentState.passwordInputValue)

      let loginResult = loginMessageFunction(fieldIsEmpty, usernameFound, emailValid, userCheckResult, passwordValid);

      if (loginResult.successfullLogin) {
        localStorage.setItem('current_user', JSON.stringify(userCheckResult));

        showAlertFunction('Welcome ' + userCheckResult?.username, loginResult.message, 'success', true);
      }
      else {
        showAlertFunction('Error', loginResult.message, 'error', false);
      }
    });
  }

  private _showAlert = (title: string, content: string, icon: string, successfullLogin: boolean) => {
    let setLoginStateFunction = this._setLoginState;

    swal({ title: title, text: content, icon: icon })
      .then(() => {
        setLoginStateFunction(successfullLogin);
      });
  }

  private _setLoginState = (signed: boolean) => {
    this.setState({
      successfullLogin: signed
    });
  }

  private _getLoginMessage(fieldIsEmpty: boolean, usernameFound: User | undefined, isCorrectEmail: boolean, userFound: User | undefined, passwordIsStrong: boolean) {
    let message;
    let successFullLogin = false;

    if (fieldIsEmpty) { message = alertsHelper.fillInputErrorMessage(); }
    else if (!usernameFound) { message = alertsHelper.userNotFoundErrorMessage(); }
    else if (!isCorrectEmail) { message = alertsHelper.incorrectEmailFormat(); }
    else if (!userFound) { message = alertsHelper.incorrectEmailOrPassword(); }
    else if (!passwordIsStrong) {
      message = alertsHelper.successLoginAlertMessage();
      successFullLogin = true;
    }
    else {
      message = alertsHelper.successLoginMessage();
      successFullLogin = true;
    }

    return {
      message: message,
      successfullLogin: successFullLogin
    };
  }

  render() {
    if (this.state.successfullLogin) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <Navbar inputValue={() => (console.log("Login"))} activeLink="Login" />
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Login</h1>
                <nav className="d-flex align-items-center">
                  <Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
                  <Link to={'/login'} >Login </Link>

                </nav>
              </div>
            </div>
          </div>
        </section>
        <div className="login-form-inner">
          <h5>სისტემაში შესვლა</h5>
          <form className="login-form">
            <div className="col-md-12 form-group">
              <input type="text" name="username" className="form-control shadow-none" placeholder="სახელი"
                value={this.state.usernameInputValue} onChange={(e) => this._usernameChange(e)}></input>
            </div>
            <div className="col-md-12 form-group">
              <input type="text" name="email" className="form-control shadow-none" placeholder="იმეილი"
                value={this.state.emailInputValue} onChange={(e) => this._emailChange(e)} ></input>
            </div>
            <div className="col-md-12 form-group">
              <input type="password" name="password" className="form-control shadow-none" placeholder="პაროლი"
                value={this.state.passwordInputValue} onChange={(e) => this._passwordChange(e)} ></input>
            </div>
            <div className="orng-btn">
              <button type="submit" value="submit" className="primary-btn" onClick={(e) => this._loginButtonAction(e)}>შესვლა</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    )
  }
}