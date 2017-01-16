import { Directive, Renderer, ElementRef, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { SharkConfigService } from '../common/config.service';

@Directive({
    selector: '[shark-tree]',
    exportAs: 'shark-tree'
})
export class TreeDirective {
    @Output('checked') checkedEvent = new EventEmitter<any>();
    @Output('selected') selectedEvent = new EventEmitter<any>();
    @Input('nodes') nodes: any;
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
        this.tree = this.elem.sharkTree({
            nodes: this.nodes,
            checkable: typeof this.checkable !== 'undefined' ? this.checkable : this.sharkConfigService.tree.checkable,
            autolink: typeof this.autolink !== 'undefined' ? this.autolink : this.sharkConfigService.tree.autolink,
            onNodeChecked: (node, isChecked) => {
                this.checkedEvent.emit({
                    type: 'checked',
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
                    type: 'selected',
                    timestamp: Date.now(),
                    data: {
                        node: node,
                    }
                });
            }
        });
        if (this.preExpand) {
            this.tree.expandAll();
        }
        if (this.preSelects && this.preSelects instanceof Array) {
            for (var i = 0; i < this.preSelects.length; i++) {
                if (this.checkable) {
                    this.tree.checkNodeForce(this.preSelects[i], this.autolink);
                }
                if (this.selectable) {
                    this.tree.selectNode(this.preSelects[i]);
                }
            }
        }
    }

    ngOnChanges(v) {
        if (this.tree) {
            this.tree.destroy();
            this.render();
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
