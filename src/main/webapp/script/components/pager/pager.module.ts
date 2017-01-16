import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagerDirective } from './pager.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PagerDirective],
    exports: [PagerDirective]
})
export class PagerModule {
}
