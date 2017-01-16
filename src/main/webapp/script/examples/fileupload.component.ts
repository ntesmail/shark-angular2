import { Component, ViewContainerRef } from '@angular/core';


@Component({
    selector: 'fileupload-demo',
    templateUrl: '/shark-angular2/components/fileupload.html'
})
export class FileuploadComponent {
    file: any;

    onselected(evt) {
        this.file = evt.data.file.name;
    }
    
    startUpload(uploader) {
        var promise = uploader.upload('/shark-angular2/xhr/file/upload.do', { userName: 'sweetyx' });
        if(promise){
            promise.progress(function (percent) {
                console.log('上传进度：' + percent);
            })
            .then(function(res){
                console.log(res);
                alert('上传成功');
            },function(error){
                console.log(error);
                alert('上传失败');
            });
        }
    }
};
