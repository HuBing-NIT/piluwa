import axios from 'axios';

let getBannerData = () => {
    let url = 'http://www.pudge.wang:3001/home/banner'
    return axios.get(url)
}









export { getBannerData }