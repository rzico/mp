import utils from '../assets/utils.js';
//时间格式化 今天 昨天 前天  年月日
Vue.filter('daydayfmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    let daySub = tds.d - res.d;
    if (daySub<1) {
        return "今天"
    } else
    if (daySub<2) {
        return "昨天"
    } else
    if (daySub<3) {
        return "前天"
    } else {
        return res.y + '年' + res.m + '月' + res.d+ '日';
    }
})

//时间格式化 今天 近三天 近七天  七天前
Vue.filter('dayfmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    let daySub = tds.d - res.d;
    if (daySub<1) {
        return "今天"
    }
    if (daySub<3) {
        return "近三天"
    }
    if (daySub<7) {
        return "近七天"
    }
    return "七天前"
})
// 时间格式化 10:30 昨天 前天 2017年09月01日 09月01日
Vue.filter('timefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    let daySub = tds.d - res.d;
    if (daySub<1) {
        return res.h +":"+ res.i ;
    }
    if (daySub<2) {
        return "昨天";
    }
    if (daySub<3) {
        return "前天"
    }
    if(res.y == tds.y){
        return  res.m + '月' + res.d + '日';
    }else{
        return res.y + '年' + res.m + '月' + res.d+ '日';
    }
})

// 时间格式化 10:30 昨天 前天 2017-09-01 09-01
Vue.filter('timefmtOther', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    let daySub = tds.d - res.d;
    if (daySub<1) {
        return res.h +":"+res.i ;
    }
    if (daySub<2) {
        return "昨天";
    }
    if (daySub<3) {
        return "前天"
    }
    //如果是今年 就不返回年份
    if(res.y == tds.y){
        return  res.m + '-' + res.d ;
    }else{
        return res.y + '-' + res.m + '-' + res.d;
    }
})


// 时间格式化  2017-09-01
Vue.filter('timeDatefmt', function (value) {
    let res = utils.resolvetimefmt(value);
        return res.y + '-' + res.m + '-' + res.d;
})

//月份格式化 本月 上月 2..12月  2016年1月..
Vue.filter('monthfmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    let m = tds.m - res.m;
    let y = tds.y - tds.y;
    if (m<1) {
        return "本月"
    }
    if (m<2) {
        return "上月"
    }
    if (y<1) {
        return res.m +"月"
    }
    return res.y+"年"+ res.m +"月";
})

//2017-01-01
Vue.filter('datefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    return res.y +"年"+ res.m +"月"+ res.d +"日";
})

//返回月份 7 8 9 单数字
Vue.filter('detailMonth', function (value) {
    let res = utils.resolvetimefmt(value);
    return res.m;
})

//时间格式化 返回 09-30 03:07
Vue.filter('datetimefmt', function (value) {

    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));

    //如果是今年 就不返回年份
    if(res.y == tds.y){
        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i ;
    }else{
        return  res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i ;
    }


})

//时间格式化 返回 09-30 03:07:56 2017-09-30 03:07:56
Vue.filter('datemoretimefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));

    //如果是今年 就不返回年份
    if(res.y == tds.y){
        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i + ':' + res.s;
    }else{
        return  res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + ':' + res.s;
    }



})
//时间格式化 返回 03:07
Vue.filter('hitimefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    return res.h + ':' + res.i ;
})

//金额保留两位小数点
Vue.filter('currencyfmt', function (value) {
    if(value == '' || value == null || value == undefined){
        return value;
    }
    // 返回处理后的值
    if (value != null) {
        if(value == 0){
            return value;
        }else{
            var price = (Math.round(value * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
            return price;
        }
    }
})
