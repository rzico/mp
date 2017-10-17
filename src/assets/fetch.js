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
                reject(response)
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
        if (response.status == 200) {
            if (response.data.type!="warn") {
                resolve(response.data)
            }
        }
        else {
            reject(response)
        }
    }, () => {})
}
