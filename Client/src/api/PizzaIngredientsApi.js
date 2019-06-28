import axios from 'axios';
import {baseUrl} from './ApiConfiguration';

const url = `${baseUrl}/PizzaIngredient`;

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

    putData = (action, payload) => {
        return axios({
            method: 'put', 
            url: url + action,
            data: payload
        });
    }

    deleteData = (action, payload) => {
        return axios({
            method: 'delete', 
            url: url + action,
            data: payload
        });
    }
};