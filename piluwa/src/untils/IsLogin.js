IsLogin = (Dialog) => {
    try {
        let obj = JSON.parse(localStorage.getItem('loginMsg'))
        if (obj) { //如果存在 已登录
            console.log('已登录')
        }
    } catch (error) {
        console.log('未登录')
        Dialog({ message: '用户未登录' });
    }
}

// module.exports = { IsLogin }
module.exports = IsLogin