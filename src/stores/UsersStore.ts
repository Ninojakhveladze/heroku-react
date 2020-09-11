import User from "../classes/User";
import axios from 'axios'

class UsersStore {
    async addUser(user: object): Promise<User | undefined> {
        return axios.post('http://localhost:3000/users', user)
            .then(resp => {
                return resp.data;
            }).catch(error => {
                console.log('error - ' + error);
            });
    }

    async getUsers(): Promise<User[]> {
        return axios.get('http://localhost:3000/users')
            .then(resp => {
                return resp.data;
            }).catch(error => {
                console.log('error - ' + error);
            });
    }
}

export default new UsersStore();