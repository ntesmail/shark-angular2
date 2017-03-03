import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-dropdown]',
    exportAs: 'shark-dropdown'
})
export class DropdownDirective {
    @Output('onSelected') selectedEvent = new EventEmitter<any>();
    @Input('text') text: any;
    @Input('data') data: any;
    @Input('actualKey') actualKey: any;
    @Input('displayKey') displayKey: any;
    elem: any;
    dropdown: any;

    constructor(
        private elementRef: ElementRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.dropdown = $.fn.sharkDropdown({
            actualKey: this.actualKey || this.sharkConfigService.dropdown.actualKey,
            displayKey: this.displayKey || this.sharkConfigService.dropdown.displayKey,
            text: this.text,
            data: this.data,
            onSelected: (item) => {
                this.selectedEvent.emit({
                    type: 'onSelected',
                    timestamp: Date.now(),
                    data: {
                        item: item
                    }
                });
            }
        });
        this.elem.append(this.dropdown.component);
    }

    ngOnChanges(v) {
        if (this.dropdown) {
            if (v.data || v.text) {
                this.dropdown.destroy();
                this.render();
            }
        }
    }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.dropdown && this.dropdown.destroy();
    }

}
