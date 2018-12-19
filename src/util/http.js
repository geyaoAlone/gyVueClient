'use strict'

import axios from 'axios'
//import { Indicator } from 'mint-ui';

const BASE_URL = 'http://39.108.221.60:9500';//'http://localhost:8080'

axios.interceptors.request.use(config => {
    // loading opend
    //Indicator.open('加载中...');
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})


function checkStatus (response) {
    // loading close
    //Indicator.close();
    try {
        if(/^(200|304|400|401)$/.test(response.status)){
            return response.data;
        }

        if(+response.status === 500 ){
            alert('系统异常');
        }

    } catch (e) {
        alert('网络异常')
    }

}

export default {
    post (url, data,token) {
        return axios({
            method: 'post',
            baseURL: BASE_URL,
            url,
            data,
            timeout: 10000,
            headers:{
              "Authorization":'Bearer '+token
            }

        }).then( response => checkStatus(response) )
    },
    get(url,token){
      return axios({
        method: 'get',
        baseURL: BASE_URL,
        url,
        timeout: 10000,
        headers:{
          "Authorization":'Bearer '+token
        }
      }).then( response => checkStatus(response) )
    }
}