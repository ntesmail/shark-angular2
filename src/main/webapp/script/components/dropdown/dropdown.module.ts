import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [DropdownDirective],
    exports: [DropdownDirective]
})
export class DropdownModule {
}
