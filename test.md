1、 npm install

2、./node_modules/.bin/webpack --config webpack.dll.config.js

3、gulp serve

4、build
gulp build --target develop

5、发布npm
gulp deploy-npm


6、部署到测试机
> gulp build --target develop

> forever start app.js --port 9006 --shark-angular2（第一次启动）

> forever restartall（重启）

> nginx配置请查看 doc/nginx.conf