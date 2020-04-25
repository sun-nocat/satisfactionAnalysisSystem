import fetch from 'dva/fetch';

const ORIGIN = 'http://127.0.0.1:8001'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const newUrl = `${ORIGIN}${url}`;
  console.log(newUrl)
  return fetch(newUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ ...data }))
    .catch(err => ({ ...err }));
}

/**
 * 封装post请求
 */
function post(url, data) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * 封装get请求
 */
function get(url, data) {

  let params = '';
  Object.keys(data).map((item) => {
    params = `${params}${item}=${data[item]}&`
  })
  const newUrl = `${url}?${params.substring(0, params.length-1)}`
  return request(newUrl)
}


export {
  post,
  get
}