const stream = weex.requireModule('stream')
const baseURL = ''

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
        //网络异常，有缓存，需要给出缓存数据，并泉   statusText 固定为 "网络不稳定"
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
                content:"网络不稳定"
            })
        }
    }, () => {})
}
