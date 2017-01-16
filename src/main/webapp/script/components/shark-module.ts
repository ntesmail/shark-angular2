import { NgModule } from '@angular/core';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { ModalModule } from './modal/modal.module';
import { PagerModule } from './pager/pager.module';
import { PopoverModule } from './popover/popover.module';
import { SelecterModule } from './selecter/selecter.module';
import { TabsModule } from './tabs/tabs.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TreeModule } from './tree/tree.module';
import { SharkConfigService } from './common/config.service';
import { SharkCommonService } from './common/common.service';
import { SharkModalService } from './modal/modal.service';
import { SharkToastrService } from './toastr/toastr.service';

@NgModule({
    exports: [AutocompleteModule, DropdownModule, FileuploadModule, ModalModule, PagerModule, PopoverModule, SelecterModule, TabsModule, TooltipModule, TreeModule],
    providers: [SharkConfigService, SharkCommonService, SharkModalService, SharkToastrService]
})
export class SharkModule {
}