import axios from 'axios';

// 首页
let getBannerData = () => {
    let url = 'http://www.pudge.wang:3001/home/banner'
    return axios.get(url)
}

let getRecommendData = () => {
    let url = 'http://www.pudge.wang:3001/home/recommend'
    return axios.post(url)
}


// 登录注册

let Login = (parms) => {
    let url = 'http://www.pudge.wang:3001/register'
    return axios.post(url, parms)
}







export { getBannerData, getRecommendData, Login }