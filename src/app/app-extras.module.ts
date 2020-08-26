import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppSkyModule } from './app-sky.module';
import { MyLibraryResourcesModule } from './shared/my-library-resources.module';
@NgModule({
  imports: [AgGridModule.withComponents([])],
  exports: [
    AppSkyModule,
    AgGridModule,
    MyLibraryResourcesModule
  ]
})
export class AppExtrasModule { }
