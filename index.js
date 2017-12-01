
/**
 * URL shortener
 * Created by Seungwon Kang
 * 
 * URL shortener produces short URLs for long URLs like
 * http://.../.../ => http://[hostname]/AbCdEf
 * 
 * It uses base64 encoding for creating URL parameter. 
 */

var http = require('http');
var app = require('./app');

http.createServer(app).listen(app.get('port'));