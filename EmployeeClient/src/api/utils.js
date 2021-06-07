import Vue from 'vue';
import Axios from 'axios';

Vue.prototype.$http = Axios;

const service = Vue.prototype.$http.create({
  baseURL: 'http://localhost:15000/api/v1/',
  headers: {
    'content-type': Vue.prototype.contentType || 'application/json;charset=utf-8',
  },
});


/* eslint-disable no-param-reassign */
service.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token) {
    request.headers.Authorization = `$Bearer ${token}`;
  }

  return request;
});

service.interceptors.response.use(response => response, (error) => {
  console.log('http error', error);
  return Promise.reject(error.status ? error : error.response);
});

function access(url, param, method) {
  param = param || {};
  // if (window.location.search.indexOf('debug') > -1) {
  //   param.debug = true;
  // }

  let ret = null;
  const upperMethod = method.toUpperCase();

  if (upperMethod === 'POST') {
    ret = service.post(url, param);
  } else if (upperMethod === 'PUT') {
    ret = service.put(url, param);
  } else if (upperMethod === 'DELETE') {
    ret = service.delete(url);
  } else {
    ret = service.get(url);
  }

  return ret.then((res) => {
    if (res.data.success) {
      return res.data;
    }
    return Promise.reject(res);
  }, res => Promise.reject(res));
}

export default {
  get(url, param) {
    return access(url, param, 'get');
  },
  delete(url, param) {
    return access(url, param, 'delete');
  },
  post(url, param) {
    return access(url, param, 'post');
  },
  put(url, param) {
    return access(url, param, 'put');
  },
};
