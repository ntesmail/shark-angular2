import { Component } from '@angular/core';

@Component({
    selector: 'tabs-demo',
    templateUrl: '/shark-angular2/components/tabs.html'
})
export class TabsComponent {
    onTabSwitch(evt) {
        console.log(evt);
    }
};
