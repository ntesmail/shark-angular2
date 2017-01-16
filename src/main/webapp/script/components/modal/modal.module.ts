import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharkModalDialog } from './sharkmodal';
import { TrustHtmlPipe } from '../common/common.pipes';

@NgModule({
    imports: [CommonModule],
    declarations: [TrustHtmlPipe, SharkModalDialog],
    entryComponents: [SharkModalDialog]//如果SharkModalDialog的配置项initWay为'resolver'(默认)，那么需要在entryComponents中声明
})
export class ModalModule {
}
