import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
    selector: 'navbar',
    template: `
        <div class="bs-docs-sidebar">
            <ul class="nav nav-stacked js-nav">
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/autocomplete">
                        autocomplete 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/dropdown">
                        dropdown 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/fileupload">
                        fileupload 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/modal">
                        modal 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/pager">
                        pager 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/popover">
                        popover 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/selecter">
                        selecter 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/tabs">
                        tabs 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/toastr">
                        toastr 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/tooltip">
                        tooltip 组件
                    </a>
                </li>
                <li>
                    <a class="js-nav-item" href="javascript:void(0);" path="/tree">
                        tree 组件
                    </a>
                </li>
            </ul>
        </div>
    `
})
export class NavBar {
    subscription: any;
    constructor(
        private elementRef: ElementRef,
        private router: Router
    ) {
    }
    ngAfterViewInit() {
        let navBar = $(this.elementRef.nativeElement).find('.js-nav');
        let navItems = $('.js-nav-item');
        let navLis = navItems.parent();
        // 点击切换路由
        navItems.on('click', (event) => {
            let target = $(event.target);
            let path = target.attr('path');
            this.router.navigate([path]);
        });
        // 路由切换时改变导航的active状态
        this.subscription = this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                var path = event.urlAfterRedirects.split(';')[0];
                navLis.removeClass('active');
                for (let i = 0; i < navItems.length; i++) {
                    let navItem = $(navItems[i]);
                    if (path.startsWith(navItem.attr('path'))) {
                        navItem.parent().addClass('active');
                    }
                }
            }
        });
    }
};
