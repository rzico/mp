
//时间格式化 今天 近三天 近七天  七天前
Vue.filter('dayfmt', function (value) {
    let date = new Date(value);
    let tody = new Date();
    let m = tody.getDay() - date.getDay();
    if (m<1) {
        return "今天"
    }
    if (m<3) {
        return "近三天"
    }
    if (m<7) {
        return "近七天"
    }
    return "七天前"
})
// 时间格式化 10:30 昨天 前天 2017-09-01
Vue.filter('timefmt', function (value) {

    let    date = new Date(value);
    let    tody = new Date();
    let    w = tody.getDay()-date.getDay();
    if (w<1) {
        let    h = date.getHours();
        let    i = date.getMinutes();
        if (h < 10) {
            h = '0' + h;
        }
        if (i < 10) {
            i = '0' + i;
        }
        return h +":"+i ;
    }
    if (w<2) {
        return "昨天";
    }
    if (w<3) {
        return "前天"
    }
    return date.getYear() + '-' + date.getMonth() + '  ' +date.getDay();
})


//月份格式化 本月 上月 2..12月  2016年1月..
Vue.filter('monthfmt', function (value) {
    // 返回处理后的值
    let date = new Date(value);
    let tody = new Date();
    let m = tody.getMonth() - date.getMonth();
    let y = tody.getYear() - date.getYear();
    if (m<1) {
        return "本月"
    }
    if (m<2) {
        return "上月"
    }
    if (y<1) {
        return date.getMonth()+"月"
    }
    return date.getYear()+"年"+date.getMonth()+"月";
})


//返回月份 7 8 9 单数字
Vue.filter('detailMonth', function (value) {
    // 返回处理后的值
    let date = new Date(value);
    let    m = date.getMonth() + 1;
    return m;
})

//时间格式化 返回 09-30 03:07
Vue.filter('datetimefmt', function (value) {
    // 返回处理后的值
    let    date = new Date(value);
    let    m = date.getMonth() + 1;
    let    d = date.getDate();
    let    H = date.getHours();
    let    i = date.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (i < 10) {
        i = '0' + i;
    }
    let t = m + '-' + d + '  ' + H + ':' + i ;
    return t;
})
//金额保留两位小数点
Vue.filter('currencyfmt', function (value) {
    // 返回处理后的值
    if (value != null) {
        var price = (Math.round(value * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
        return price;
    }
})
