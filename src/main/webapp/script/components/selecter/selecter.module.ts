import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelecterDirective } from './selecter.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [SelecterDirective],
    exports: [SelecterDirective]
})
export class SelecterModule {
}
