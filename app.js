var path = require('path');
var fs = require('fs');
var express = require('express');
var argv = require('yargs').argv;
var request = require('sync-request');
var config = require('./shark-deploy-conf.js');

var app = express();
var webappDir = 'dist/';

var showdown  = require('showdown'),
converter = new showdown.Converter();

app.engine('.html', require('ejs').__express);
// 后缀
app.set('view engine', 'html');
// 模板目录
app.set('views', path.join(__dirname, webappDir, 'app/examples'));

// head
var headContent = request('GET', 'http://shark.mail.netease.com/shark/static/head.html?v=shark-angular2').getBody();
var footContent = request('GET', 'http://shark.mail.netease.com/shark/static/foot.html?v=shark-angular2').getBody();

// index.html
app.get(config.contextPath + '/index.html', function(req, res) {
    //向页面模板传递参数，可以传递字符串和对象，注意格式
    res.render('index', {converter: converter, headContent: headContent, footContent: footContent});
});
var viewRouter = express.Router();
viewRouter.get('/components/:template.html', function(req, res, next) {
    var template = req.params.template;
    res.render('components/' + template, {converter: converter, headContent: headContent, footContent: footContent});
})
app.use('/shark-angular2', viewRouter);

//font
app.use(config.contextPath + '/font', express.static(path.join(webappDir, 'app/font')));
//mimg
app.use(config.contextPath, express.static(path.join(webappDir, 'mimg')));
//ajax mock
app.use(config.contextPath + config.ajaxPrefix, function(req, res) {
    var data = path.join(config.rootPath, config.mock, config.ajaxPrefix, req.path);
    if (fs.existsSync(data)) {
        res.send(fs.readFileSync(data));
    } else {
        res.status(404).send('file not exist !');
    }
});
var port = argv.port || config.port;
app.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('express listening on %d', port);
});
