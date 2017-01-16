import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteDirective } from './autocomplete.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [AutocompleteDirective],
    exports: [AutocompleteDirective]
})
export class AutocompleteModule {
}
