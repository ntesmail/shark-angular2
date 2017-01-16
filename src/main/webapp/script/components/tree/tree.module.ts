import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeDirective } from './tree.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TreeDirective],
    exports: [TreeDirective]
})
export class TreeModule {
}
