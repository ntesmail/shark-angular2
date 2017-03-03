import { Component } from '@angular/core';

@Component({
    selector: 'pager-demo',
    templateUrl: '/shark-angular2/components/pager.html'
})
export class PagerComponent {
    pagination= {
        page: 10,
        totalPage: 100
    };
    hl = {
        firstpage: 'first',
        prevpage: 'prev',
        nextpage: 'next',
        lastpage: 'last',
        gopage: 'go'
    };
    onPageChanged(evt) {
        console.log(evt);
    }
};
