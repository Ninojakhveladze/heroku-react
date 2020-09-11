export default class User {
    id: number;
    username: string;
    email: string;
    password: string;
    balance: number;

    constructor (id: number, username: string, email: string, password: string, balance: number ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }
}
