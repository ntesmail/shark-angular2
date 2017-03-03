import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-tabs]',
    exportAs: 'shark-tabs'
})
export class TabsDirective {
    @Input('initTab') initTab: number;
    @Output('onTabSwitch') tabChangedEvent = new EventEmitter<any>();
    elem: any;
    tabs: any;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.tabs = this.elem.sharkTabs({
            initTab: typeof this.initTab !== 'undefined' ? this.initTab : this.sharkConfigService.tabs.initTab,
            onTabSwitch: (index) => {
                this.tabChangedEvent.emit({
                    type: 'onTabSwitch',
                    timestamp: Date.now(),
                    data: {
                        active: index
                    }
                });
            }
        });
    }

    ngOnChanges(v) {
    }

    ngOnInit(){
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.tabs && this.tabs.destroy();
    }

}
