import { Component, OnInit } from '@angular/core';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { DataService } from './data.service';
import { SkyLibResourcesService } from '@skyux/i18n';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent implements OnInit {
  public homeLabel: string;
  public top10: string;
  constructor(private modalService: SkyModalService, private dataService: DataService, private resources: SkyLibResourcesService) {}
  public ngOnInit() {
    this.localization();
    }
  public localization() {
    this.dataService.subject$.subscribe((res) => {
      console.log(res);
      if (res === 'hi_IN') {
        this.homeLabel = this.resources.getStringForLocale(
          { locale: 'hi_IN' }, 'app_nav_home'
        );
        this.top10 = this.resources.getStringForLocale(
          { locale: 'hi_IN' }, 'top_10'
        );
      }
      if (res === 'en_US') {
        this.homeLabel = this.resources.getStringForLocale(
          { locale: 'en_US' }, 'app_nav_home'
        );
        this.top10 = this.resources.getStringForLocale(
          { locale: 'en_US' }, 'top_10'
        );
      }
    });
  }
  public openModal(): void {
    const modalInstance = this.modalService.open(AddMovieComponent);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log(result);
      if (result.reason === 'cancel') {
        alert('Cancel adding');
      } else {
        alert('Saving data!');
      }
    });
  }
}
