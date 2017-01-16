import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileuploadDirective } from './fileupload.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [FileuploadDirective],
    exports: [FileuploadDirective]
})
export class FileuploadModule {
}
