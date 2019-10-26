import Cookies from 'js-cookie';
import axios from 'axios';
import {Message, MessageBox} from 'element-ui';
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
        if (response.data.code !== '2000000' && response.data.code !== '2000009' && response.data.code !== '2000006' && response.data.code !== '2000009' && response.data.code !== '500100') {

            if (response.config.url === '/web/submitChoiceAssistUser') { // 报单申请提交

                setTimeout(() => {
                    MessageBox.alert(`<div style="max-height: calc(100vh - 160px);overflow: scroll;s">${response.data.msg}</div>`, '提示', {
                        confirmButtonText: '确定',
                        dangerouslyUseHTMLString: true,
                        callback: action => {
                        }
                    });
                }, 100);
                return response;
            }

            //业务异常，在报单申请的时候查询商业条款不提示
            if (response.data.msg != '查询商业条款信息失败') {
                Message.error({message: response.data.msg, duration: 5 * 1000});
                return response;
            }
        }

        if (response.data.code == '5000050') {
            Cookies.remove('token');
            localStorage.setItem('errorMsg', response.data.msg);
            window.location.href = '/';
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
