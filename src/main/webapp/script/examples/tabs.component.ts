import { Component } from '@angular/core';

@Component({
    selector: 'tabs-demo',
    templateUrl: '/shark-angular2/components/tabs.html'
})
export class TabsComponent {
    activeTab: number = 0;
    
    ngOnInit(){
        setTimeout(()=>{
            this.activeTab = 1;
        },2000);
    }

    tabChanged(evt) {
        console.log(evt);
    }
};
