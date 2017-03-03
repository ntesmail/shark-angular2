import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-selecter]',
    exportAs: 'shark-selecter'
})
export class SelecterDirective {
    @Input('activeStyle') activeStyle: string;
    @Input('actualKey') actualKey: string;
    @Input('displayKey') displayKey: string;
    @Input('data') data: any;
    @Input('model') model: number;
    @Output('modelChange') modelChange = new EventEmitter<any>();
    @Output('onSelected') selectedEvent = new EventEmitter<any>();
    elem: any;
    selecter: any;

    constructor(
        private elementRef: ElementRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.selecter = $.fn.sharkSelecter({
            activeStyle: this.activeStyle || this.sharkConfigService.selecter.activeStyle,
            actualKey: this.actualKey || this.sharkConfigService.selecter.actualKey,
            displayKey: this.displayKey || this.sharkConfigService.selecter.displayKey,
            data: this.data,
            onSelected: (value, item) => {
                this.modelChange.emit(value);
                this.selectedEvent.emit({
                    type: 'onSelected',
                    timestamp: Date.now(),
                    data: {
                        value: value,
                        item: item
                    }
                });
            }
        });
        this.elem.append(this.selecter.component);
        if (typeof this.model !== 'undefined' && this.model !== null) {
            this.selecter.setValue(this.model, false);
        }
    }

    ngOnChanges(v) {
        if (this.selecter) {
            if (v.data) {
                this.selecter.destroy();
                this.render();
            } else if (v.model) {
                this.selecter.setValue(v.model.currentValue, false); //不触发回调
            }
        }

    }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.selecter && this.selecter.destroy();
    }

}
