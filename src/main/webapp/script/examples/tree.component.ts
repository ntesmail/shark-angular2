import { Component } from '@angular/core';

@Component({
    selector: 'tree-demo',
    templateUrl: '/shark-angular2/components/tree.html'
})
export class TreeComponent {
    treeData: any = [{
        node_id: 10000,
        node_name: '网易',
        children: [{
            node_id: 11000,
            node_name: '邮件事业部'
        }, {
            node_id: 12000,
            node_name: '杭州研究院'
        }, {
            node_id: 13000,
            node_name: '移动互娱事业部'
        }]
    }];
    preSelectsNodes = [11000, 12000];
};
