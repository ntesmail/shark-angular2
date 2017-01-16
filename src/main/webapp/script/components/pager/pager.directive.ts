import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-pager]',
    exportAs: 'shark-pager'
})
export class PagerDirective {
    @Output('pageChanged') pageChangedEvent = new EventEmitter<any>();
    @Input('totalPage') totalPage: number;
    @Input('page') page: number;
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
            page: this.page,
            totalPages: this.totalPage,
            segmentSize: this.segmentSize || this.sharkConfigService.pager.segmentSize,
            startFrom: this.startFrom || this.sharkConfigService.pager.startFrom,
            gopage: typeof this.gopage !== 'undefined' ? this.gopage : this.sharkConfigService.pager.gopage,
            onWillChange: page => {
                this.pageChangedEvent.emit({
                    type: 'pageChanged',
                    timestamp: Date.now(),
                    data: {
                        page: page
                    }
                });
            }
        });
        this.elem.append(this.pager);
    }

    ngOnChanges(v) {
        if (this.pager) {
            this.pager.setPage(this.page, this.totalPage);
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
