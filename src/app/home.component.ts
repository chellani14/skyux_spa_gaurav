import { Component, OnInit, EventEmitter } from '@angular/core';
import { MovieDetails } from './Models/movie-details';
import { DataService } from './shared/data.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public movieListDetails: MovieDetails[] = [];
  public $helloLabel = new EventEmitter();
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.movieListDetails = this.dataService.getData();
    this.getMovies();
  }

  private getMovies() {
    this.dataService.$movieList.subscribe(
      (res: MovieDetails[]) => {
        this.movieListDetails = res;
        console.log('res: ', res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
