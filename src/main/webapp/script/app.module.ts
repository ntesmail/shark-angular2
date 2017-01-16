/***********module***************/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
/***********examples component***************/
import { AutocompleteComponent } from './examples/autocomplete.component';
import { DropdownComponent } from './examples/dropdown.component';
import { FileuploadComponent } from './examples/fileupload.component';
import { ModalComponent, EditArticleModal } from './examples/modal.component';
import { PagerComponent } from './examples/pager.component';
import { PopoverComponent } from './examples/popover.component';
import { SelecterComponent } from './examples/selecter.component';
import { TabsComponent } from './examples/tabs.component';
import { ToastrComponent } from './examples/toastr.component';
import { TooltipComponent } from './examples/tooltip.component';
import { TreeComponent } from './examples/tree.component';
/***********component***************/
import { SharkModule } from './components/index';

import { NavBar } from './navbar.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const routes: Routes = [{
    path: 'autocomplete',
    component: AutocompleteComponent
}, {
    path: 'dropdown',
    component: DropdownComponent
}, {
    path: 'fileupload',
    component: FileuploadComponent
}, {
    path: 'modal',
    component: ModalComponent
}, {
    path: 'pager',
    component: PagerComponent
}, {
    path: 'popover',
    component: PopoverComponent
}, {
    path: 'selecter',
    component: SelecterComponent
}, {
    path: 'tabs',
    component: TabsComponent
}, {
    path: 'toastr',
    component: ToastrComponent
}, {
    path: 'tooltip',
    component: TooltipComponent
}, {
    path: 'tree',
    component: TreeComponent
}];

const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

@Pipe({ name: 'trusthtml' })
export class TrustHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(html: any) {
        return this.sanitizer.bypassSecurityTrustHtml(html || '');
    }
};

@NgModule({
    imports: [BrowserModule, FormsModule, SharkModule],
    declarations: [NavBar, AppComponent, TrustHtmlPipe, AutocompleteComponent, DropdownComponent, FileuploadComponent, ModalComponent, EditArticleModal, PagerComponent, PopoverComponent, SelecterComponent, TabsComponent, ToastrComponent, TooltipComponent, TreeComponent],
    entryComponents: [EditArticleModal],//如果EditArticleModal的配置项initWay为'resolver'(默认)，那么需要在entryComponents中声明
    bootstrap: [AppComponent]
})
export class AppModule { }
