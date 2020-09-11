import User from '../classes/User'

function checkField(username: string, email: string, password: string) {
    return username === "" || email === "" || password === "";
}

function checkUsername(users: User[], username: string) {
    return users.find(user => user.username === username);
}

function checkEmail(email: string) {
    let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let validEmail = pattern.exec(email) !== null;

    return validEmail;
}

function checkEmailExistence(users: User[], email: string) {
    return users.find(user => user.email === email);
}

function checkUser(users: User[], possibleUsername: string, possibleEmail: string, possiblePassword: string) {
    return users.find(user => user.username === possibleUsername
        && user.email === possibleEmail
        && user.password === possiblePassword);
}

function checkPasswordStrength(password: string) {
    let pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\s]).{6,}$/;
    let validPassword = pattern.exec(password) !== null;

    return validPassword;
}

function togglePasswordVisibility() {
    let passwordInput = document.querySelector('#inputPassword') as HTMLInputElement;
    if ((passwordInput)!.type === 'password')
        (passwordInput)!.type = 'text';
    else
        (passwordInput)!.type = 'password';
}

function toggleEyeIcon() {
    let eyeIcon = document.querySelector('#eye-icon');

    eyeIcon?.classList.toggle('fa-eye-slash');
    eyeIcon?.classList.toggle('fa-eye');
}

export default {
    checkField, checkUsername, checkEmail, checkUser, checkPasswordStrength, togglePasswordVisibility, toggleEyeIcon, checkEmailExistence
}