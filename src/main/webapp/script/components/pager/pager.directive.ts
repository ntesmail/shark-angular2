import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-pager]',
    exportAs: 'shark-pager'
})
export class PagerDirective {
    @Output('onPageChanged') pageChangedEvent = new EventEmitter<any>();
    @Input('currentPage') currentPage: number;
    @Input('totalPage') totalPage: number;
    @Input('hl') hl: Object;
    @Input('segmentSize') segmentSize: number;
    @Input('startFrom') startFrom: number;
    @Input('gopage') gopage: boolean;
    elem: any;
    pager: any;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.pager = $.fn.sharkPager({
            page: this.currentPage,
            totalPages: this.totalPage,
            hl: this.hl || this.sharkConfigService.pager.hl,
            segmentSize: this.segmentSize || this.sharkConfigService.pager.segmentSize,
            startFrom: typeof this.startFrom !== 'undefined' ? this.startFrom : this.sharkConfigService.pager.startFrom,
            gopage: typeof this.gopage !== 'undefined' ? this.gopage : this.sharkConfigService.pager.gopage,
            onPageChanged: (page) => {
                this.pageChangedEvent.emit({
                    type: 'onPageChanged',
                    timestamp: Date.now(),
                    data: {
                        page: page
                    }
                });
            }
        });
        this.elem.append(this.pager.component);
    }

    ngOnChanges(v) {
        if (this.pager) {
            this.pager.setPage(this.currentPage, this.totalPage);
        }
    }

    ngOnInit(){
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.pager && this.pager.destroy();
    }

}
