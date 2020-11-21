const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();


export function syncMakeRequest(method: any, url: any, params?: any, user?: any, password?: any): XMLHttpRequest {
  xhr.open(method, url, false, user, password);
  xhr.contentType = 'application/json';
  xhr.onload = (): any => {
  };
  xhr.send(params);
  return xhr;
}

