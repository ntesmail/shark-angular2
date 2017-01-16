import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-autocomplete]',
    exportAs: 'shark-autocomplete'
})
export class AutocompleteDirective {
    @Input('autoFill') autoFill: boolean;
    @Input('debounceTime') debounceTime: number;
    @Input('displayKey') displayKey: string;
    @Input('filterData') filterData: any;
    @Output('selected') selectedEvent = new EventEmitter<any>();
    @Output('ngModelChange') ngModelChange = new EventEmitter<any>();
    elem: any;
    autocomplete: any;

    constructor(
        private elementRef: ElementRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.autocomplete = this.elem.sharkAutoComplete({
            autocomplete: this.autoFill || this.sharkConfigService.autocomplete.autoFill,
            debounceTime: this.debounceTime || this.sharkConfigService.autocomplete.debounceTime,
            displayKey: this.displayKey || this.sharkConfigService.autocomplete.displayKey,
            filterData: this.filterData,
            onSelected: (item) => {
                this.ngModelChange.emit(
                    this.autocomplete.val()
                );
                this.selectedEvent.emit({
                    type: 'selected',
                    timestamp: Date.now(),
                    data: {
                        item: item
                    }
                });
            }
        });
    }

    // autocomplete不能destroy再渲染
    // ngOnChanges(v) {
    //     if (this.autocomplete) {
    //         this.autocomplete.destroy();
    //         this.render();
    //     }
    // }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.autocomplete && this.autocomplete.destroy();
    }

}
