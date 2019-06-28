import axios from 'axios';
import {baseUrl} from './ApiConfigurations';

const url = `${baseUrl()}/Account`;

export default class AccountApi {
    login = (userName, password) => {
        return axios({
            method: 'post', 
            url: url + '/Login',
            data: {
                Email: userName,
                Password: password
            }
        });
    }

    resetPassword = (userName) => {
        return axios({
            method: 'post', 
            url: url + '/ResetPassword',
            data: {
                Email: userName
            }
        });
    }

    confirmReset = (action, secret) => {
        return axios({
            method: 'get', 
            url: url + action + `?secret=${secret}`
        });
    }

    reset = (userName, password, token) => {
        return axios({
            method: 'post', 
            url: url + '/ConfirmReset',
            data: {
                Email: userName,
                Password: password,
                Token: token
            }
        });
    }

    create = (userName, password) => {
        return axios({
            method: 'post', 
            url: url + '/Register',
            headers: {'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).token},
            data: {
                Email: userName,
                Password: password
            }
        });
    }

    getData = (action) => {
        return axios({
            method: 'get', 
            url: url + action,
            headers: {'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).token}
        });
    }

    postData = (action, payload) => {
        return axios({
            method: 'post', 
            url: url + action,
            data: payload,
            headers: {'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).token}
        });
    }
};