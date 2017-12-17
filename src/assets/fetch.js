const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const baseURL = '';
import utils from './utils.js';
const event = weex.requireModule('event');
export function POST (path,body) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method:'POST',
            url: `${baseURL}${path}`,
            type: 'json',
            body:`${body}`
        }, (response) => {
            if (response.status == 200) {
                resolve(response.data)
            }
            else {
                reject({
                    type:"error",
                    content:"网络不稳定"
                })
            }
        }, () => {})
    })
}

export function GET (path,resolve,reject) {
    // let cacheParams = {
    //     type:'httpCache',//类型
    //     key:`${baseURL}${path}`,//关键址
    // }
    // event.find(cacheParams,function (cache) {
    //    if (cache.type=='success') {
    //        if (cache.data != '') {
    //            resolve(JSON.parse(cache.data.value));
    //        }
    //    }
    // })
    stream.fetch({
        method:'GET',
        url: `${baseURL}${path}`,
        type: 'json'
    }, (response) => {
        //请求 type=success 或 warn 或 error（没缓存） 时返回，都能正常获取数据
        if (response.status == 200) {
            resolve(response.data)
        } else
        //请求 type= error 网络正常，但服务器返回错误，有缓存，也需要给数据，并提示出错了  statusText=服务器返回的 content
        //网络异常，有缓存，需要给出缓存数据，并且   statusText 固定为 "网络不稳定"
        if (response.status == 304) {
            resolve(response.data)
            reject({
                type:"error",
                content:response.statusText
            })
        } else
        //网络异常，没有缓存
        {
            reject({
                type:"error",
                content:'网络不稳定'
            })
        }
    }, () => {})
}
//二维码扫描
export function SCAN (message,resolve,reject) {
    if(message.type == 'success'){
        utils.readScan(message.data,function (data) {
            if(data.type == 'success'){
                if(data.data.type == '865380'){
                    let userId = parseInt(data.data.code) - 10200;
                    POST('weex/member/friends/add.jhtml?friendId='+ userId).then(
                        function (mes) {
                            if (mes.type == "success") {
                                event.toast('添加好友请求已发送,请等待对方验证');
                            } else {
                                event.toast(mes.content);
                            }
                            resolve(mes)
                        }, function (err) {
                            reject(err);
                            event.toast(err.content);
                        }
                    )
                }else if(data.data.type == '818803'){
                    GET('weex/member/couponCode/use.jhtml?code='+ data.data.code,function (mes) {
                        modal.alert({
                            message:mes.content,
                            duration: 0.3
                        }, function (value) {
                        })
                    }, function (err) {
                        event.toast(err.content)
                    })
                }else if(data.data.type == 'webView'){
                    event.openURL(message.data,function () {

                    });
                }
            }else{
                event.toast(data.content);
            }
        });
    }else{

    }

}