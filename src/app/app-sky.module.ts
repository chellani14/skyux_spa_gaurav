import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { AgGridModule } from 'ag-grid-angular';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyAvatarModule } from '@skyux/avatar';
import { SkyGridModule } from '@skyux/grids';
import {
  SkyAlertModule,
  SkyKeyInfoModule
} from '@skyux/indicators';
import { SkyFluidGridModule, SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';
import { SkyNavbarModule } from '@skyux/navbar';
@NgModule({
  // imports:[AgGridModule.withComponents([])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyGridModule,
    SkyAgGridModule,
    SkyToolbarModule,
    SkySearchModule
  ]
})
export class AppSkyModule { }
