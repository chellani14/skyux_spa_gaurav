import { Component } from '@angular/core';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';
import { AddMovieComponent } from '../add-movie/add-movie.component';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent {
  public nav = [
    {
      titleKey: 'app_nav_home',
      path: '/'
    },
    {
      titleKey: 'app-top-rated-movies',
      path: '/top-rated-movies'
    }
  ];
  public navMovie = [
    {
      titleKey: 'add_movie',
      path: '/add-movie'
    }
  ];

  constructor(private modalService: SkyModalService) {}
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
