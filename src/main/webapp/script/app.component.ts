import { Component, Input, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { SharkCommonService } from './components/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demo',
    templateUrl: '/shark-angular2/components/app.html'
})
export class AppComponent {
    constructor(
        private viewContainerRef: ViewContainerRef,
        private sharkCommonService: SharkCommonService
    ) {
        sharkCommonService.setRootViewContainerRef(viewContainerRef);
    }
};
