var path = require('path');
var fs = require('fs');
var os = require('os');
var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('webpack');
var exec = require('sync-exec');
var express = require('express');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var sharkAutomation = require('shark-automation');
var request = require('sync-request');

var config = require('./shark-deploy-conf.js');

function execCmd(cmds, processOpts) {
    var opts = [];
    opts = opts.concat(cmds);
    var msg = exec(opts.join(' '), 60000, processOpts);
    console.log(msg.stderr || msg.stdout);
    if (msg.status !== 0) {
        throw new Error('Exec cmd: [' + opts.join(' ') + ']');
    }
}
/***------------- build start ---------------***/

gulp.task('build', function(cb) {
    sharkAutomation.registerBuildTasks({
        baseConf: config,
        gulp: gulp,
        webpack: {
            replaceEntry: {
                'script/bootstrap': [path.join(__dirname, config.webapp, config.jsPath, 'bootstrap.ts')]
            },
            output: {
                path: path.join(__dirname, config.tmpDir, 'step1'),
                filename: '[name].js'
            },
            module: {
                loaders: [{
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'awesome-typescript-loader'
                }]
            },
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            plugins: [
                new webpack.DllReferencePlugin({
                    context: __dirname,
                    manifest: require(path.join(__dirname, config.webapp, config.jsPath, 'lib/angular2/angular2-manifest.json'))
                })
            ]
        }
    });
    var target = argv.target;
    if (!target) {
        throw new Error('--target should be provided. ex: gulp build --target test');
    }
    if (target !== 'online' && target !== 'test' && target !== 'develop') {
        throw new Error('--target should be online or test or develop');
    }

    gulp.on('error', function() {
        console.log('error error error error');
    });

    runSequence(
        // clean folders
        ['clean'],
        // compass and copy to tmp1
        ['sass-preprocess'],
        // rollup build
        ['webpack-server'],
        // use reference in html and ftl
        ['useref'],
        // imagemin and copy to tmp1
        ['imagemin'],
        // revision images
        ['revision-image'],
        // revreplace images
        ['revreplace-css', 'revreplace-js'],
        // revision css,js
        ['revision-css', 'revision-js'],
        // revreplace html,ftl
        ['revreplace-html','revreplace-ftl'],
        // build java
        ['build-java'],
        // copy to build dir, copy java
        ['copy-build','copy-build-java'],
        // callback
        cb
    );

});
/***------------- build emd ---------------***/

gulp.task('serve-express', function (cb) {
    var app = express();
    var showdown  = require('showdown'),
    converter = new showdown.Converter();

    app.engine('.html', require('ejs').__express);
    // 后缀
    app.set('view engine', 'html');
    // 模板目录
    app.set('views', path.join(__dirname, 'src/main/webapp/examples'));
    // head
    var headContent = request('GET', 'http://shark.mail.netease.com/shark/static/head.html?v=shark-angular2').getBody();
    // foot
    var footContent = request('GET', 'http://shark.mail.netease.com/shark/static/foot.html?v=shark-angular2').getBody();

    // index.html
    app.get('/shark-angular2/index.html', function(req, res) {
        //向页面模板传递参数，可以传递字符串和对象，注意格式
        res.render('index', {converter: converter, headContent: headContent, footContent: footContent});
    });
    var viewRouter = express.Router();
    viewRouter.get('/components/:template.html', function(req, res, next) {
        var template = req.params.template;
        res.render('components/' + template, {converter: converter, headContent: headContent, footContent: footContent});
    })
    app.use('/shark-angular2', viewRouter);

    var router = sharkAutomation.registerServerRouter({
        baseConf: config,
        gulp: gulp,
        webpack: {
            entry: {
                'script/bootstrap': [path.join(__dirname, config.webapp, config.jsPath, 'bootstrap.ts'), 'webpack-hot-middleware/client']
            },
            module: {
                loaders: [{
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'awesome-typescript-loader'
                }]
            },
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            plugins: [
                new webpack.DllReferencePlugin({
                    context: __dirname,
                    manifest: require(path.join(__dirname, config.webapp, config.jsPath, 'lib/angular2/angular2-manifest.json'))
                })
            ]
        }
    });
    app.use(router);
    app.listen(config.port, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('express listening on %d', config.port);
        cb();
    });

});

gulp.task('serve', function (cb) {
    sharkAutomation.registerServerTasks({
        baseConf: config,
        gulp: gulp
    });
    runSequence(['browser-sync', 'serve-express'], 'open-url', cb);
});

/*************deploy to npm****************/
gulp.task('clean-npm', function () {
    return gulp.src(['./npm-dist', './aot'], {read: false}).pipe(clean());
});
gulp.task('build-npm', function (cb) {
    execCmd(['"node_modules/.bin/ngc" -p tsconfig-npm.json']);
    cb();
});
gulp.task('copy-npm', function (cb) {
    fs.writeFileSync(path.join('npm-dist','README.md'), fs.readFileSync(path.join('README.md')));
    fs.writeFileSync(path.join('npm-dist','package.json'), fs.readFileSync(path.join('package.json')));
    cb();
});
gulp.task('deploy-npm', function(cb) {
    runSequence(
        ['clean-npm'],
        ['build-npm'],
        ['copy-npm'],
        cb
    );
});