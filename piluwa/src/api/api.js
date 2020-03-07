import axios from 'axios';
//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function(data) {
//     let ret = ''
//     for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]




// 首页
let getBannerData = () => {
    let url = 'http://www.pudge.wang:3001/home/banner'
    return axios.get(url)
}

let getRecommendData = () => {
    let url = 'http://www.pudge.wang:3001/home/recommend'
    return axios.post(url)
}

// 类别页
let getClassify = (index) => {
    let url = 'http://www.pudge.wang:3001/classify'
    return axios.post(url, { type: index })
}


// 登录注册

let Login = (parms) => {
    let url = 'http://www.pudge.wang:3001/register'
    return axios.post(url, parms)
}


let getCode = (parms) => {
    let url = 'http://www.pudge.wang:3001/register/getCode'
    return axios.post(url, parms)
}

let register = (parms) => {
    let url = 'http://www.pudge.wang:3001/register'
    return axios.post(url, parms)
}


export {
    getBannerData,
    getRecommendData,
    Login,
    getCode,
    register,
    getClassify
}