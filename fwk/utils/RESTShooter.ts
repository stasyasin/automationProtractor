const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

export class RESTShooter {

  static syncMakeRequest(method: any, url: any, params?: any, user?: any, password?: any): void {
    xhr.open(method, url, false, user, password);
    xhr.contentType = 'application/json';
    xhr.onload = (): any => {};
    xhr.send(params);
    return xhr;
  }

}
