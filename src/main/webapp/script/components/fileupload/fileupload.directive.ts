import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-fileupload]',
    exportAs: 'shark-fileupload'
})
export class FileuploadDirective {
    @Input('autoupload') autoupload: boolean;// 是否自动上传
    @Input('accept') accept: string;// 支持的文件类型
    @Input('dragable') dragable: boolean;// 是否支持拖拽
    @Input('url') url: string;// 是否自动上传
    @Output('onSelected') selectedEvent = new EventEmitter<any>();
    @Output('onUploading') uploadingEvent = new EventEmitter<any>();
    @Output('onUploaded') uploadedEvent = new EventEmitter<any>();
    @Output('onFailed') failedEvent = new EventEmitter<any>();
    elem: any;
    fileupload: any;

    constructor(
        private elementRef: ElementRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    upload(url, params) {
        return this.fileupload.upload(url, params);
    }

    render() {
        this.fileupload = this.elem.sharkFileupload({
            autoupload: typeof this.autoupload !== 'undefined' ? this.autoupload : this.sharkConfigService.fileupload.autoupload,
            accept: this.accept || this.sharkConfigService.fileupload.accept,
            dragable: typeof this.dragable !== 'undefined' ? this.dragable : this.sharkConfigService.fileupload.dragable,
            url: this.url,
            onSelected: (file) => {
                this.selectedEvent.emit({
                    type: 'selected',
                    timestamp: Date.now(),
                    data: {
                        file: file
                    }
                });
                if (this.autoupload && this.url) {
                    this.fileupload.upload(this.url);
                }
            },
            onUploading: (file, percent) => {
                this.uploadingEvent.emit({
                    type: 'uploading',
                    timestamp: Date.now(),
                    data: {
                        file: file,
                        percent: percent
                    }
                });
            },
            onUploaded: (file, result) => {
                this.uploadedEvent.emit({
                    type: 'uploaded',
                    timestamp: Date.now(),
                    data: {
                        file: file,
                        result: result
                    }
                });
            },
            onFailed: (file, error) => {
                this.failedEvent.emit({
                    type: 'failed',
                    timestamp: Date.now(),
                    data: {
                        file: file,
                        error: error
                    }
                });
            }
        });
    }

    ngOnChanges(v) {
        if (this.fileupload) {
            this.fileupload.destroy();
            this.render();
        }
    }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.fileupload && this.fileupload.destroy();
    }

}
