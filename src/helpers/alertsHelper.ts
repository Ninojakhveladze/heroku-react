function idSearchFailed() {
    return 'მანქანა ვერ მოიძებნა';
}

function carNotFoundWithinPrice() {
    return 'სამუხაროდ ამ ფასში მანქანა ვერ მოიძებნა';
}

function incorrectPriceFormat() {
    return 'გთხოვთ შეიყვანოთ ფასი სწორ ფორმატში';
}

function averagePriceMessage(price: number) {
    return `ჩვენს საიტზე არსებული მანქანების საშუალო ღირებულება არის ${price}$`
}

function fillInputErrorMessage() {
    return 'გთხოვთ შეავსეთ მონაცემები';
}

function userNotFoundErrorMessage() {
    return 'მოცემული სახელით მომხმარებელი არ მოიძებნა';
}

function incorrectEmailFormat() {
    return 'იმეილი არის არასწორ ფორმატში, გთხოვთ გაასწოროთ';
}

function userAlreadyExistsMessage() {
    return 'მოცემული სახელით მომხმარებელი უკვე არსებობს';
}

function emailAlreadyExistsMessage() {
    return 'მოცემული მეილით მომხმარებელი უკვე არსებობს';
}

function incorrectEmailOrPassword() {
    return 'პაროლი ან მეილი არასწორია';
}

function successLoginAlertMessage() {
    return 'სისტემაში შეხვედით წარმატებით, თუმცა გთხოვთ შეცვალოთ პაროლი';
}

function successLoginMessage() {
    return 'შეხვედით სისტემაში წარმატებით';
}

function successRegisterMessage() {
    return 'დარეგისტრირდით სისტემაში წარმატებით';
}

function errorInRegistration(){
    return 'შეცდომა რეგისტრაციისას';
}

export default {
    idSearchFailed, carNotFoundWithinPrice, incorrectPriceFormat, averagePriceMessage, 
    fillInputErrorMessage, userNotFoundErrorMessage,  incorrectEmailFormat, incorrectEmailOrPassword,  
    successLoginAlertMessage, successLoginMessage, userAlreadyExistsMessage, emailAlreadyExistsMessage,
    successRegisterMessage, errorInRegistration
}