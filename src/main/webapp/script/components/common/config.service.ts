import { Injectable } from '@angular/core';


@Injectable()
export class SharkConfigService {
    autocomplete = {
        debounceTime: 300,
        autoFill: false,
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
        actualKey: 'value',
        displayKey: 'name'
    }
    tooltip = {
        direction: 'right',
    }
    tabs = {
        active: 0,
    }
    tree = {
        checkable: false,
        autolink: true,
        selectable: false
    }
}