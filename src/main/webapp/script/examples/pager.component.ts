import { Component } from '@angular/core';

@Component({
    selector: 'pager-demo',
    templateUrl: '/shark-angular2/components/pager.html'
})
export class PagerComponent {
    pagination= {
        page: 1,
        totalPage: 100
    };

    pageChanged(evt, pager) {
        this.pagination.page = evt.data.page;
    }
};
