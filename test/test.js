var Api = require('../lib/api.js');
var api = new Api('http://localhost:3000/api/v1/');
var Base64 = require('base-64');
api.login('18618127785', 'nanzi17yin').then(
  function(res){},
  function(res){console.log(res);}
);

var token = Base64.encode('18600000001:yin17173');
api.getTasks(token).then(
  function(tasks) {
    console.log(tasks);
  },
  function(error) {
    console.log(error);
  }
)

api.processOrder('151114064180', 'ship', token).then(
  function(order) {
    console.log(order);
  },
  function(error) {
    console.log(error);
  }
)
