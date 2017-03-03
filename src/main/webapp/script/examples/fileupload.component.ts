import { Component, ViewContainerRef } from '@angular/core';


@Component({
    selector: 'fileupload-demo',
    templateUrl: '/shark-angular2/components/fileupload.html'
})
export class FileuploadComponent {
    file: any;

    onSelected(evt) {
        this.file = evt.data.file.name;
    }

    onUploading(evt) {
        console.log(evt);
    }

    onUploaded(evt) {
        console.log(evt);
    }

    onFailed(evt) {
        console.log(evt);
    }

    startUpload(uploader) {
        uploader.upload('/shark-angular2/xhr/file/upload.do', { userName: 'sweetyx' });
    }
};
