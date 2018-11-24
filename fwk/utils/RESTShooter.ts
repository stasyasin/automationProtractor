let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let xhr = new XMLHttpRequest();

export class RESTShooter {

  public static syncMakeRequest(method, url, params?, user?, password?) {
    xhr.open(method, url, false, user, password);
    xhr.contentType = 'application/json';
    xhr.onload = function() {
    };
    xhr.send(params);
    return xhr;
  }

}
