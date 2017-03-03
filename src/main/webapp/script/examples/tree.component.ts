import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'tree-demo',
    templateUrl: '/shark-angular2/components/tree.html'
})
export class TreeComponent {
    @ViewChild('tree') treeDirective: any;

    treeData: any = [{
        node_id: '1',
        node_name: '网易',
        children: [{
            node_id: '1-1',
            node_name: '邮件事业部'
        }, {
            node_id: '1-2',
            node_name: '杭州研究院'
        }, {
            node_id: '1-3',
            node_name: '移动互娱事业部'
        }]
    }];
    preSelectsNodes = ['1-1', '1-3'];

    onChecked(evt) {
        console.log(evt);
    }

    checkAll() {
        this.treeDirective.tree.checkAll();
    };
    reverseCheckAll() {
        this.treeDirective.tree.reverseCheck();
    };
    checkNo() {
        this.treeDirective.tree.checkNo();
    };
};
