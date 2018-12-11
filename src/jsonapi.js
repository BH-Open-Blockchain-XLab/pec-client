import config from './config';

import 'whatwg-fetch'

let headers = {
    'Content-Type': 'application/json; charset=utf-8'
};

let jsonapi = {
  post: (route, obj) => {
    return fetch(config.baseUrl+route, {
      method: 'POST', 
      headers,
      body: JSON.stringify(obj)
    }).then((response) => {
      return response.json();
    });
  },
  get: (route) => {
    return fetch(config.baseUrl+route).then(function(response) {
      return response.json();
    }).then((json) => {
      return json;
    });
  }
};

export default jsonapi;


