import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-popover]',
    exportAs: 'shark-popover'
})
export class PopoverDirective {
    @Input('popoverTitle') popoverTitle: string;
    @Input('popoverContent') popoverContent: string;
    @Input('popoverClose') popoverClose: string;
    @Input('direction') popoverDirection: string;
    elem: any;
    popover: any;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.popover = $.fn.sharkPopover({
            event: this.sharkConfigService.popover.event,
            close: this.popoverClose || this.sharkConfigService.popover.close,
            direction: this.popoverDirection || this.sharkConfigService.popover.direction,
            title: this.popoverTitle,
            content: this.popoverContent
        });
        this.popover.linkTo(this.elem);
    }

    ngOnChanges(v) {
        if (this.popover) {
            this.popover.destroy();
            this.render();
        }
    }

    ngOnInit(){
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.popover && this.popover.destroy();
    }

}
