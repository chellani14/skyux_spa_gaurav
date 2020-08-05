import { NgModule } from "@angular/core";
import { SkyAgGridModule } from "@skyux/ag-grid";
import { SkyAvatarModule } from "@skyux/avatar";
import { SkyGridModule } from "@skyux/grids";
import { SkyAlertModule, SkyKeyInfoModule } from "@skyux/indicators";
import { SkyFluidGridModule, SkyToolbarModule } from "@skyux/layout";
import { SkySearchModule } from "@skyux/lookup";
import { SkyModalModule } from "@skyux/modals";
import { SkyNavbarModule } from "@skyux/navbar";
import { SkyDropdownModule } from "@skyux/popovers";
import { SkyGridContentMenuComponent } from "./form/grid/sky-grid-content-menu/sky-grid-content-menu.component";
import { SkyGridEditModalComponent } from "./form/grid/sky-grid-edit-modal/sky-grid-edit-modal.component";
@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyGridModule,
    SkyAgGridModule,
    SkyToolbarModule,
    SkySearchModule,
    SkyDropdownModule,
    SkyModalModule,
  ],
  entryComponents: [SkyGridContentMenuComponent, SkyGridEditModalComponent],
  providers: [SkyGridContentMenuComponent, SkyGridEditModalComponent],
})
export class AppSkyModule {}
