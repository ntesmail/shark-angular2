import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-tabs]',
    exportAs: 'shark-tabs'
})
export class TabsDirective {
    @Output('tabChanged') tabChangedEvent = new EventEmitter<any>();
    @Input('model') active: number;
    @Output('modelChange') activeChange = new EventEmitter<any>();
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
            event: 'click',
            active: typeof this.active !== 'undefined' ? this.active : this.sharkConfigService.tabs.active,
            onTabSwitch: (index) => {
                this.activeChange.emit(index);
                this.tabChangedEvent.emit({
                    type: 'tabChanged',
                    timestamp: Date.now(),
                    data: {
                        active: index
                    }
                });
            }
        });
    }

    ngOnChanges(v) {
        if (this.tabs) {
            this.tabs.switchTo(this.active, false); //不触发回调
        }
    }

    ngOnInit(){
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.tabs && this.tabs.destroy();
    }

}
