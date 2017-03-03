import { Injectable } from '@angular/core';


@Injectable()
export class SharkConfigService {
    autocomplete = {
        debounceTime: 300,
        autocomplete: false,
        displayKey: 'name'
    }
    dropdown = {
        actualKey: 'value',
        displayKey: 'name'
    };
    fileupload = {
        accept: '',
        dragable: false
    }
    pager = {
        hl: {
            firstpage: '首页',
            prevpage: '上一页',
            nextpage: '下一页',
            lastpage: '尾页',
            gopage: '跳转'
        },
        segmentSize: 5,
        startFrom: 1,
        gopage: true
    }
    popover = {
        event: 'click',
        close: 'bodyclick',
        direction: 'right',
    }
    selecter = {
        activeStyle: null,
        actualKey: 'value',
        displayKey: 'name'
    }
    tooltip = {
        direction: 'right',
    }
    tabs = {
        initTab: 0,
    }
    tree = {
        checkable: false,
        autolink: true,
        selectable: false
    }
}