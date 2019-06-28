import axios from 'axios';
import {baseUrl} from './ApiConfiguration';

const url = `${baseUrl}/Ingredient`;

export default class AccountApi {

    getData = (action) => {
        return axios({
            method: 'get', 
            url: url + action
        });
    }

    postData = (action, payload) => {
        return axios({
            method: 'post', 
            url: url + action,
            data: payload
        });
    }

    deleteData = (action) => {
        return axios({
            method: 'delete', 
            url: url + action
        });
    }
};