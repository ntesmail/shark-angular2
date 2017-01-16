import { Component } from '@angular/core';
import { SharkToastrService } from '../components/index';

@Component({
    selector: 'toastr-demo',
    templateUrl: '/shark-angular2/components/toastr.html'
})
export class ToastrComponent {
    constructor(
        private sharkToastrService: SharkToastrService
    ) { }

    success() {
        this.sharkToastrService.success('保存成功！');
    }

    error() {
        this.sharkToastrService.error('保存失败！');
    }
};
