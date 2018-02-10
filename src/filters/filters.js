import utils from '../assets/utils.js';
//时间格式化 今天 昨天 前天  年月日
Vue.filter('daydayfmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));

    let d1 = Date.parse(utils.ymdtimefmt(value));
    let d2 = Date.parse(utils.ymdtimefmt(Math.round(new Date().getTime())));
    let span = Math.abs(d2-d1);
    let daySub = Math.floor(span / (24 * 3600 * 1000));

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

    let d1 = Date.parse(utils.ymdtimefmt(value));
    let d2 = Date.parse(utils.ymdtimefmt(Math.round(new Date().getTime())));
    let span = Math.abs(d2-d1);
    let daySub = Math.floor(span / (24 * 3600 * 1000));
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

    let d1 = Date.parse(utils.ymdtimefmt(value));
    let d2 = Date.parse(utils.ymdtimefmt(Math.round(new Date().getTime())));
    let span = Math.abs(d2-d1);
    let daySub = Math.floor(span / (24 * 3600 * 1000));
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

// 时间格式化  2017年09月01日 09月01日
Vue.filter('ymdtimefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
    if(res.y == tds.y){
        return  res.m + '月' + res.d + '日';
    }else{
        return res.y + '年' + res.m + '月' + res.d+ '日';
    }
})

// 时间格式化 10:30 昨天10:30  2017年09月01日10:30 09月01日10:30
Vue.filter('timefmtMore', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));

    let d1 = Date.parse(utils.ymdtimefmt(value));
    let d2 = Date.parse(utils.ymdtimefmt(Math.round(new Date().getTime())));
    let span = Math.abs(d2-d1);
    let daySub = Math.floor(span / (24 * 3600 * 1000));
    if (daySub<1) {
        return res.h +":"+ res.i ;
    }
    if (daySub<2) {
        return "昨天"+ ' ' + res.h +":"+ res.i;
    }
    if(res.y == tds.y){
        return  res.m + '月' + res.d + '日'+ ' ' + res.h +":"+ res.i;
    }else{
        return res.y + '年' + res.m + '月' + res.d+ '日'+ ' ' + res.h +":"+ res.i;
    }
})


// 时间格式化 10:30 昨天 前天 2017-09-01 09-01
Vue.filter('timefmtOther', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));

    let d1 = Date.parse(utils.ymdtimefmt(value));
    let d2 = Date.parse(utils.ymdtimefmt(Math.round(new Date().getTime())));
    let span = Math.abs(d2-d1);
    let daySub = Math.floor(span / (24 * 3600 * 1000));
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
    if (y<1 && m<1) {
        return "本月"
    }
    if (y<1 && m<2) {
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
//时间格式化 返回 09-30 03:07周日 2017-09-30 03:07周日
Vue.filter('dateweektimefmt', function (value) {
    let res = utils.resolvetimefmt(value);
    let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
// 返回处理后的值
    var    date = new Date(value);
    var    d2 = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds());
    date = new Date(d2+28800000);
    var    day = date.getUTCDay();
    switch(day){
        case 0:
            day = "周日";
            break;
        case 1:
            day = "周一";
            break;
        case 2:
            day = "周二";
            break;
        case 3:
            day = "周三";
            break;
        case 4:
            day = "周四";
            break;
        case 5:
            day = "周五";
            break;
        case 6:
            day = "周六";
            break;
    }


    //如果是今年 就不返回年份
    if(res.y == tds.y){
        return res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
    }else{
        return  res.y + '-' + res.m + '-' + res.d + '  ' + res.h + ':' + res.i + day;
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
