import { Component, OnInit } from '@angular/core';
import { ListSortFieldSelectorModel } from '@skyux/list-builder-common';
import { BehaviorSubject } from 'rxjs';
import { MovieDetails } from '../Models/movie-details';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html'
})
export class TopRatedMoviesComponent implements OnInit {
  public arrOfMovies: number[] = [];
  public movieListDetails: MovieDetails[] = [];
  public asyncHeading = new BehaviorSubject<string>('');
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.movieListDetails = this.dataService.getData();
    this.getMovies();
    this.movieListDetails.sort(function (a, b) {
      return a.rating - b.rating;
    });
    this.movieListDetails = this.movieListDetails.slice(-10);
    console.log(this.movieListDetails);
    // Simulate async request:
    setTimeout(() => {
      this.asyncHeading.next('Rating');
    }, 1000);
  }

  public onSortChangeForGrid(activeSort: ListSortFieldSelectorModel) {
    this.movieListDetails = this.sortGridData(
      activeSort,
      this.movieListDetails
    );
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

  private sortGridData(activeSort: ListSortFieldSelectorModel, data: any[]) {
    const sortField = activeSort.fieldSelector;
    const descending = activeSort.descending;

    return data
      .sort((a: any, b: any) => {
        let value1 = a[sortField];
        let value2 = b[sortField];

        if (value1 && typeof value1 === 'string') {
          value1 = value1.toLowerCase();
        }

        if (value2 && typeof value2 === 'string') {
          value2 = value2.toLowerCase();
        }

        if (value1 === value2) {
          return 0;
        }

        let result = value1 > value2 ? 1 : -1;

        if (descending) {
          result *= -1;
        }

        return result;
      })
      .slice(0, 9);
  }
}
