import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-tooltip]',
    exportAs: 'shark-tooltip'
})
export class TooltipDirective {
    @Input('tooltipContent') tooltipContent: string;
    @Input('direction') direction: string;
    elem: any;
    tooltip: any;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.tooltip = $.fn.sharkTooltip({
            event: 'mouseover',
            direction: this.direction || this.sharkConfigService.tooltip.direction,
            content: this.tooltipContent
        });
        this.tooltip.linkTo(this.elem);
    }

    ngOnChanges(v) {
        if (this.tooltip) {
            this.tooltip.destroy();
            this.render();
        }
    }

    ngOnInit(){
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.tooltip && this.tooltip.destroy();
    }

}
