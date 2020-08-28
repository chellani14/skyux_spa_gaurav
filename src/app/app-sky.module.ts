import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyAvatarModule } from '@skyux/avatar';
import { SkyGridModule } from '@skyux/grids';
import {
  SkyAlertModule,
  SkyKeyInfoModule
} from '@skyux/indicators';
import { SkyFluidGridModule, SkyToolbarModule } from '@skyux/layout';
import { SkyPagingModule } from '@skyux/lists';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule, SkyConfirmModule } from '@skyux/modals';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyDropdownModule } from '@skyux/popovers';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AgGridEditModalContextComponent } from './grid/ag-grid-edit-modal-context.component';
import { AgGridEditModalComponent } from './grid/ag-grid-edit-modal.component';
@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyModalModule,
    SkyGridModule,
    SkyAgGridModule,
    SkyToolbarModule,
    SkySearchModule,
    SkyPagingModule,
    SkyDropdownModule,
    SkyConfirmModule
  ],
  entryComponents: [AddMovieComponent, AgGridEditModalComponent, AgGridEditModalContextComponent],
  providers: [AddMovieComponent, AgGridEditModalComponent, AgGridEditModalContextComponent]
})
export class AppSkyModule { }
