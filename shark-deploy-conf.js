module.exports = {
    comment: 'shark-angular2',
    version: '0.1.0',
    product: 'shark-angular2',
    contextPath: '/shark-angular2',
    protocol: 'http',
    browserPort: 9004,
    port: 19004,
    hostname: 'localhost',
    openurl: 'http://localhost:9004/shark-angular2/index.html',
    rootPath: __dirname,
    tmpDir: '.tmp',
    webapp: 'src/main/webapp',
    mock: 'src/test/mock',
    scssPath: 'style/scss',
    cssPath: 'style/css',
    imgPath: 'style/img',
    videoPath: 'style/video',
    jsPath: 'script',
    fontPath: 'font',
    htmlPath: '',
    templatePath: 'WEB-INF/tmpl',
    staticVersion: '20160226',
    ajaxPrefix: '/xhr',
    mimgPathPrefix: '/hxm',
    ifwebpack: true,
    projectType: '',
    mimgURLPrefix: {
        develop: '', //the rootpath of static resource during develop phase
        online: '', //the rootpath of static resource at online phase
        test: '' //the rootpath of static resource at test phase
    },
};
