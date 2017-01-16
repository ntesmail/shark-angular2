import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsDirective } from './tabs.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TabsDirective],
    exports: [TabsDirective]
})
export class TabsModule {
}
