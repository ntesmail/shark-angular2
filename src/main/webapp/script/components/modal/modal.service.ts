import { Injectable } from '@angular/core';
import { SharkCommonService } from '../common/common.service';
import { SharkModalParams, SharkModalDialog } from './sharkmodal';


@Injectable()
export class SharkModalService {

    public constructor(
        private sharkCommonService: SharkCommonService
    ) { }

    //打开弹窗
    public open(config: any) {
        if (!config.params) {
            config.params = {};
        }
        else{
            config.params = $.extend(true, {}, config.params);
        }
        var componentRef;
        var promise = new Promise((resolve, reject) => {
            config.params.modalBackdrop = config.backdrop;
            config.params.resolveFn = resolve;
            config.params.rejectFn = reject;
            //we no longer to support 'runtime' way to compile component dynamically，because that is not supported officially.
            //more information please see this issue: [https://github.com/angular/angular/issues/11780]
            componentRef = this.sharkCommonService.appendComponentToRootByResolver(config.component, SharkModalParams, config.params);
        });
        promise.then(() => {
            componentRef && componentRef.destroy();
        }).catch((e) => {
            if (e) {
                console.error(e);
            }
            componentRef && componentRef.destroy();
        });
        return promise;
    }

    public confirm(config: any = {}) {
        var params: any = {
            title: '提示',
            content: '',
            size: '',
            okText: '确定',
            cancelText: '取消',
            closeBtn: true
        };
        $.extend(true, params, config);
        params.type = 'confirm';
        return this.open({
            backdrop: 'static',
            component: SharkModalDialog,
            params: params
        });
    }

    public alert(config: any = {}) {
        var params: any = {
            title: '提示',
            content: '',
            size: '',
            okText: '确定',
            closeBtn: true
        };
        $.extend(true, params, config);
        params.type = 'alert';
        return this.open({
            backdrop: 'static',
            component: SharkModalDialog,
            params: params
        });
    }

}
