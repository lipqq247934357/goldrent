import Cookies from 'js-cookie';
import axios from 'axios';
import {Message} from 'element-ui';
import router from './router';


axios.defaults.timeout = 10000;
if (process.env.NODE_ENV === 'development') {// 根据不同的环境使用不同的接口
    axios.defaults.baseURL = '/web';
} else {
    axios.defaults.baseURL = '/web';
}
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        config.headers['token'] = Cookies.get('token') || '';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (!response || !response.data || !response.data.code) {
            return response;
        }
        if (response.data.code !== '2000000' && response.data.code !== '2000009' && response.data.code !== '2000006') {
            //业务异常
            Message.error({message: response.data.msg, duration: 5 * 1000});
        }

        if (response.data.code == '5000050') {
            Cookies.remove('token');
            window.location.hash = '/login';
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);

export const get = (url) => {
    return axios.get(url);
}


export const post = (url, data) => {
    return axios.post(url, data);
}
