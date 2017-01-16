import { Component, HostListener, ElementRef } from '@angular/core';

/**
 * 弹窗参数的class
 */
export class SharkModalParams {
    constructor(options) {
        Object.assign(this, options);
    }
}

/**
 * 弹窗的基类
 */
export class SharkModal {
    modal: any;
    body: any;
    backdropEle: any;
    modalParams: any;
    modalBackdrop: any;
    constructor(
        private sharkModalParams: SharkModalParams,
        private elementRef: ElementRef
    ) {
        this.modalBackdrop = (sharkModalParams as any).modalBackdrop;
        delete (sharkModalParams as any).modalBackdrop;
        this.modalParams = {};
        Object.assign(this.modalParams, sharkModalParams);
        this.body = $(document.body);
        var i = 0;
        var interval = setInterval(() => {
            if (i >= 100 || $(this.elementRef.nativeElement).children().length > 0) {
                clearInterval(interval);
                this.renderModal();
            }
            ++i;
        }, 16);
    }

    renderModal() {
        this.modal = $(this.elementRef.nativeElement.children);
        this.modal.on('click', (evt) => {
            if (this.modalBackdrop === 'static' || (this.modal && evt.target !== this.modal[0])) {
                return;
            }
            else {
                this.dismiss();
            }
        });
        this.backdropEle = $('<div class="modal-backdrop fade in"></div>');
        this.body.append(this.backdropEle);
        this.body.addClass('modal-open');
        this.modal.show();
        this.modal.scrollTop(0);
        this.modal.addClass('in');
    }

    close(result?: any) {
        this.modal.off('click');
        this.backdropEle.remove();
        this.body.removeClass('modal-open');
        this.modal.hide();
        this.modalParams.resolveFn && this.modalParams.resolveFn(result);
    }

    dismiss() {
        this.modal.off('click');
        this.backdropEle.remove();
        this.body.removeClass('modal-open');
        this.modal.hide();
        this.modalParams.rejectFn && this.modalParams.rejectFn();
    }

}

/**
 * confirm/alert 弹窗
 */
@Component({
    selector: 'shark-modal-dialog',
    template: `
        <div class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button *ngIf="modalParams?.closeBtn" class="close" (click)="dismiss()">×</button>
                        <h4 class="modal-title">
                            <div [innerHTML]="modalParams?.title | trusthtml"></div>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div [innerHTML]="modalParams?.content | trusthtml"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button" (click)="close()">{{modalParams?.okText}}</button>
                        <button *ngIf="modalParams?.type==='confirm'" class="btn btn-warning" type="button" (click)="dismiss()">{{modalParams?.cancelText}}</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class SharkModalDialog extends SharkModal {
    constructor(
        sharkModalParams: SharkModalParams,
        elementRef: ElementRef
    ) {
        super(sharkModalParams, elementRef);
    }
};
