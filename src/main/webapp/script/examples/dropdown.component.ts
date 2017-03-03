import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'dropdown-demo',
    templateUrl: '/shark-angular2/components/dropdown.html'
})
export class DropdownComponent {
    text = '操作';
    data: any = [
        {
            value: 1001,
            html: '新建'
        }, {
            value: 1002,
            html: '编辑'
        }, {
            value: 1003,
            html: '删除'
        }
    ];
    onSelected(evt) {
        console.log(evt);
    }

};
