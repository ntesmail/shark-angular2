import { Component, ElementRef } from '@angular/core';
import { SharkModal, SharkModalParams, SharkModalService, SharkToastrService } from '../components/index';

@Component({
    selector: 'edit-article-modal',
    template: `
        <div class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" (click)="dismiss()">×</button>
                        <h4 class="modal-title">
                            {{title}}
                        </h4>
                    </div>
                    <div class="modal-body">
                        {{content}}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button" (click)="ok()">确定</button>
                        <button class="btn btn-warning" type="button" (click)="dismiss()">取消</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class EditArticleModal extends SharkModal {
    title: any;
    content: any;
    constructor(
        sharkModalParams: SharkModalParams,
        elementRef: ElementRef
    ) {
        super(sharkModalParams, elementRef);//必须调用父组件的构造函数
        this.title = this.modalParams.title;
        this.content = this.modalParams.content;
    }
    ok() {
        this.close();
    }
};

@Component({
    selector: 'modal-demo',
    templateUrl: '/shark-angular2/components/modal.html'
})
export class ModalComponent {
    constructor(
        private sharkModalService: SharkModalService,
        private sharkToastrService: SharkToastrService
    ) { }

    alert() {
        this.sharkModalService.alert({
            content: '操作成功！'
        });
    }

    confirm() {
        this.sharkModalService.confirm({
            content: '确定保存吗？'
        }).then(() => {
            this.sharkToastrService.success('点击了确定！');
        }, () => {
            this.sharkToastrService.error('点击了取消！');
        });
    }

    dialog() {
        this.sharkModalService.open({
            backdrop: 'static',
            component: EditArticleModal,
            params: { title: '曾内人', content: '禁门宫树月痕过，媚眼惟看宿鹭窠。斜拔玉钗灯影畔，剔开红焰救飞蛾。' }
        }).then((res: any) => {
            this.sharkToastrService.success('点击了确定！');
        }, () => {
            this.sharkToastrService.error('点击了取消！');
        });
    }

};
