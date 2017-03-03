import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-autocomplete]',
    exportAs: 'shark-autocomplete'
})
export class AutocompleteDirective {
    @Input('autocomplete') autocomplete: boolean;
    @Input('debounceTime') debounceTime: number;
    @Input('displayKey') displayKey: string;
    @Input('filterData') filterData: any;
    @Output('onSelected') selectedEvent = new EventEmitter<any>();
    @Output('ngModelChange') ngModelChange = new EventEmitter<any>();
    elem: any;
    autoCompleteComponent: any;

    constructor(
        private elementRef: ElementRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.autoCompleteComponent = this.elem.sharkAutoComplete({
            autocomplete: this.autocomplete || this.sharkConfigService.autocomplete.autocomplete,
            debounceTime: this.debounceTime || this.sharkConfigService.autocomplete.debounceTime,
            displayKey: this.displayKey || this.sharkConfigService.autocomplete.displayKey,
            filterData: this.filterData,
            onSelected: (item) => {
                this.ngModelChange.emit(
                    item[this.displayKey]
                );
                this.selectedEvent.emit({
                    type: 'onSelected',
                    timestamp: Date.now(),
                    data: {
                        item: item
                    }
                });
            }
        });
    }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.autoCompleteComponent && this.autoCompleteComponent.destroy();
    }

}
