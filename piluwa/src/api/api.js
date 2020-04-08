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


let Host = 'http://47.97.244.129:3001'

// let Host = 'http://localhost:3001'
// let Host = 'http://www.pudge.wang:3001'

// 首页
let getBannerData = () => {
    let url = `${Host}/home/banner`
    return axios.get(url)
}

let getRecommendData = () => {
    let url = `${Host}/home/recommend`
    return axios.post(url)
}

// 类别页
let getClassify = (index) => {
    let url = `${Host}/classify`
    return axios.post(url, { type: index })
}

// 模糊查询
let FuzzySearch = (parms)=>{
    let url =   `${Host}/classify/fuzzy`
    return axios.post(url, parms)
}



// 登录
let Login = (parms) => {
    let url = `${Host}/register/login`
    return axios.post(url, parms)
}

// 手机验证码
let getCode = (parms) => {
    let url = `${Host}/register/getCode`
    return axios.post(url, parms)
}

// 注册
let register = (parms) => {
    let url = `${Host}/register`
    return axios.post(url, parms)
}

// 获取我的信息
let getMymsg = (parms) => {
    let url = `${Host}/userinfo/get`
    return axios.post(url, parms)
}

// 获取我的收货地址
let getAddress = (parms) => {
    let url = `${Host}/address/get`
    return axios.post(url, parms)
}

// 获取详细地址
let getDetailAddress = (parms) =>{
    let url =  `${Host}/address/getaddressById`
    return axios.post(url,parms)
}

// 添加地址
let addAddress = (parms) => {
    let url = `${Host}/address/add`
    return axios.post(url, parms)
}
// 编辑地址
let editAddress = (parms)=>{
    let url = `${Host}/address/update`
    return axios.post(url, parms)
}
// 删除地址
let deleteAddress=(parms)=>{
    let url = `${Host}/address/delete`
    return axios.post(url, parms)
}


// 获得商品详情
let getshopDetail = (parms) => { //参数是productId
    let url = `${Host}/detail`
    console.log(parms)
    return axios.post(url, parms)
}

// 订单提交
let sumbitOrder = (parms) =>{
    let url = `${Host}/order/add`
    console.log(parms)
    return axios.post(url, parms)
}
// 订单更新
let updateOrder = (parms) =>{
    let url = `${Host}/order/update`
    console.log(parms)
    return axios.post(url, parms)
}

// 请求订单数据
let getOrderList = (parms) =>{
    let url = `${Host}/order/getOrder`
    console.log(parms)
    return axios.post(url, parms)
}



export {
    getBannerData,
    getRecommendData,
    Login,
    getCode,
    register,
    getClassify,
    getMymsg,
    getAddress,
    addAddress,
    getshopDetail,
    getDetailAddress,
    editAddress,
    deleteAddress,
    FuzzySearch,
    sumbitOrder,
    updateOrder,
    getOrderList
}