import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'dropdown-demo',
    templateUrl: '/shark-angular2/components/dropdown.html'
})
export class DropdownComponent {
    data: any = [
        {
            value: 1001,
            name: '新建'
        }, {
            value: 1002,
            name: '编辑'
        }, {
            value: 1003,
            name: '删除'
        }
    ];
    
    onSelected(evt) {
        console.log(evt.data.item);
    }

};
