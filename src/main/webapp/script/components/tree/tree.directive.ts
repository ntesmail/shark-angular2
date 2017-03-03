import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-tree]',
    exportAs: 'shark-tree'
})
export class TreeDirective {
    @Output('onChecked') checkedEvent = new EventEmitter<any>();
    @Output('onSelected') selectedEvent = new EventEmitter<any>();
    @Input('data') data: any;
    @Input('checkable') checkable: boolean;
    @Input('autolink') autolink: boolean;
    @Input('selectable') selectable: boolean;
    @Input('preExpand') preExpand: boolean;
    @Input('preSelects') preSelects: any;
    elem: any;
    tree: any;
    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private sharkConfigService: SharkConfigService
    ) {
        this.elem = $(this.elementRef.nativeElement);
    }

    render() {
        this.tree = $.fn.sharkTree({
            nodes: this.data,
            checkable: typeof this.checkable !== 'undefined' ? this.checkable : this.sharkConfigService.tree.checkable,
            autolink: typeof this.autolink !== 'undefined' ? this.autolink : this.sharkConfigService.tree.autolink,
            onNodeChecked: (node, isChecked) => {
                this.checkedEvent.emit({
                    type: 'onChecked',
                    timestamp: Date.now(),
                    data: {
                        node: node,
                        isChecked: isChecked
                    }
                });
            },
            selectable: typeof this.selectable !== 'undefined' ? this.selectable : this.sharkConfigService.tree.selectable,
            onNodeSelected: (node) => {
                this.selectedEvent.emit({
                    type: 'onSelected',
                    timestamp: Date.now(),
                    data: {
                        node: node,
                    }
                });
            }
        });
        this.elem.append(this.tree.component);
        if (this.preExpand) {
            this.tree.expandAll();
        }
        if (this.preSelects && this.preSelects instanceof Array) {
            for (var i = 0; i < this.preSelects.length; i++) {
                if (this.checkable) {
                    this.tree.checkNode(this.preSelects[i]);
                }
                if (this.selectable) {
                    this.tree.selectNode(this.preSelects[i]);
                }
            }
        }
    }

    ngOnChanges(v) {
        if (this.tree) {
            if (v.data) {
                this.tree.destroy();
                this.render();
            }
        }
    }

    ngOnInit() {
        this.render();
    }

    ngOnDestroy() {
        //销毁时调用，处理自定义事件解绑或者移除元素等操作
        this.tree && this.tree.destroy();
    }

}
