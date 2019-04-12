import Qs from "qs";
import axios from 'axios';
import {Message} from 'element-ui';
import router from './router'

axios.defaults.timeout = 5000;
if (process.env.NODE_ENV === 'development') {// 根据不同的环境使用不同的接口
    axios.defaults.baseURL = '/mock';
} else {
    axios.defaults.baseURL = '/api';
}
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        // TODO 如果提示需要登录跳转到登录页面 需要登录的code码没有
        if (response.data.resultCode !== 2000000) {
            router.push({
                path: '/login'
            });
        }
        if (response.data.resultCode !== 2000000) {
            //业务异常
            Message.error({message: response.data.resultMsg, duration: 5 * 1000});
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);

export const get = (url, data = {}) => {
    let method = 'get';
    return axios({method, url, data});
}


export const post = (url, data = {}) => {
    let method = 'post';
    data = Qs.stringify(data);
    return axios({method, url, data});
}
