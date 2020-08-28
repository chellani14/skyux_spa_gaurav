import {
  NgModule
} from '@angular/core';

import {
  SkyI18nModule,
  SKY_LIB_RESOURCES_PROVIDERS
} from '@skyux/i18n';
import { MyLibraryResourcesProvider } from '../public/plugin-resources/my-library-resources-provider';
@NgModule({
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: MyLibraryResourcesProvider,
    multi: true
  }],
  exports: [
    SkyI18nModule
  ]
})
export class MyLibraryResourcesModule { }
