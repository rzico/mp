const stream = weex.requireModule('stream')
const baseURL = ''

export function fetch (type,path,body) {
  return new Promise((resolve, reject) => {
    stream.fetch({
      method:`${type}`,
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

export function POST (path,body) {
  return fetch('POST',path,body)
}

export function GET (path) {
  return fetch('GET',path)
}
