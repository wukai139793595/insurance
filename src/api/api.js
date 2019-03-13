import axios from 'axios'
import Qs from 'qs'
axios.defaults.widthCredentials = true;
const PROCOTOL_HEAD = 'http://dev-open.'
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = PROCOTOL_HEAD + 'yunbisai.com';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = PROCOTOL_HEAD + 'yunbisai.com';
}

let post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: url,
            data: Qs.stringify(params),
            header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
//获取保单信息
export const postQueryPolicy = (params) => {return post('/index/index/getPolicy',params)};
//退保
export const postPolicyCancel = (params) => {return post('/index/index/policyCancell', params)}