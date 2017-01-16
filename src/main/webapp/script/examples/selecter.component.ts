import { Component } from '@angular/core';

@Component({
    selector: 'selecter-demo',
    templateUrl: '/shark-angular2/components/selecter.html'
})
export class SelecterComponent {
    value: number = 1001;
    data: any = [
        {
            value: '',
            name: '请选择'
        }, {
            value: 1001,
            name: '一年级'
        }, {
            value: 1002,
            name: '二年级'
        }
    ];
};
