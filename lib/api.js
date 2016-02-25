var request = require('request');
var Q = require('q');

var Yin17Api = function (url) {
  this.auth = {mobile: undefined, password: undefined};
  this.apiRootUrl = undefined;
  this.apiRootUrl = url ? url : 'http://yin17.com/api/v1/'
}

Yin17Api.prototype.login = function (mobile, password) {
  var _this = this;
  var deferred = Q.defer();
  // var token = Base64.encode(mobile + ':' + password)
  request.get({
    url: _this.apiRootUrl + 'login',
    json: true
  }, function(error, response, body){
    if(!error && response.statusCode == 200) {
      _this.auth.mobile = mobile;
      _this.auth.password = password;
      deferred.resolve(response.body.data);
    } else {
      deferred.reject(response.body);
      deferred.resolve();
    }
  }).auth(mobile, password);
  return deferred.promise;
};

Yin17Api.prototype.getTasks = function (token) {
  var deferred = Q.defer();
  var _this = this;
  request.get({
    url: _this.apiRootUrl + 'deliveryman/orders',
    json: true,
    auth: {
      bearer: 'Basic ' + token
    }
  }, function(error, response, body){
    if(!error && response.statusCode == 200) {
      deferred.resolve(response.body.data);
    } else {
      deferred.reject(response.body);
      deferred.resolve();
    }
  });
  return deferred.promise;
};

Yin17Api.prototype.processOrder = function (orderid, action, token, memo) {
  var _this = this;
  var deferred = Q.defer();
  var url = 'deliveryman/orders/' + orderid + '/procedure/' + action
   request.post({
    url: _this.apiRootUrl + url,
    json: true,
    form: {
      extra: !!memo ? memo: ''
    },
    auth: {
      bearer: 'Basic ' + token
    }
  }, function(error, response, body){
    if(!error && response.statusCode == 200) {
      deferred.resolve(response.body.data);
    } else {
      deferred.reject(response.body);
      deferred.resolve();
    }
  });
  return deferred.promise;
}

module.exports = Yin17Api;
