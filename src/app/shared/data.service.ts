import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDATA } from '../Models/mock-data';
import { MovieDetails } from '../Models/movie-details';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movieListData: MovieDetails[] = [];
  public arrTemp: MovieDetails[] = [];
  public movieListDetails: MovieDetails[] = [];

  public movies: MovieDetails;
  public $movieList = new EventEmitter();
  public $movieListDetails = new EventEmitter();
  public $getAllMovies = new EventEmitter();
  constructor() {}

  public saveData(movie: MovieDetails) {
    if (localStorage.getItem('testdata')) {
      this.movieListData = JSON.parse(localStorage.getItem('testdata'));
      this.movieListData.push(movie);
      console.log('appended user list: ', this.movieListData);
      localStorage.setItem('testdata', JSON.stringify(this.movieListData));
      console.log(movie);
      this.$movieList.emit(this.movieListData);
      return true;
    } else {
      this.movieListData.push(movie);
      localStorage.setItem('testdata', JSON.stringify(this.movieListData));
      console.log(movie);
      this.$movieList.emit(this.movieListData);
      return true;
    }
  }
  public getData() {
    let movieList: MovieDetails[] = [];
    for (let i in MOCKDATA) {
      if (MOCKDATA[i]) {
        movieList.push(MOCKDATA[i]);
      }
    }
    console.log('movielist: ', movieList);
    console.log('mockdata: ', MOCKDATA);
    if (localStorage.getItem('testdata')) {
      let temp = localStorage.getItem('testdata');
      this.arrTemp = JSON.parse(temp);
      for (let j in this.arrTemp) {
        if (this.arrTemp[j]) {
          movieList.push(this.arrTemp[j]);
        }
      }
      console.log(movieList);
      this.$getAllMovies.emit(movieList);
      return movieList;
    }
  }
}
