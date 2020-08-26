import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDATA } from '../Models/mock-data';
import { MovieDetails } from '../Models/movie-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movieListData: MovieDetails[] = [];
  public arrTemp: MovieDetails[] = [];
  public mockDataEnabled: boolean = false;
  public movies: MovieDetails;
  public $movieList = new EventEmitter();
  public subject$ = new BehaviorSubject('en_US');

  constructor( ) { }

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
  public localizationString(locale: string) {
     this.subject$.next(locale);
  }

  public deleteMovie(movie: MovieDetails) {
    let getAllMoviesData = localStorage.getItem('testdata');
    let movieIndex = -1;
    let objMovie = JSON.parse(getAllMoviesData);
    for (let i = 0; i < objMovie.length; i++) {
      if (objMovie[i].movieTitle === movie.movieTitle && objMovie[i].genre === movie.genre && objMovie[i].id === movie.id ) {
          movieIndex = i;
      }
    }
    objMovie.splice(movieIndex, 1);
    localStorage.setItem('testdata', JSON.stringify(objMovie));
    return true;
  }

  public editMovie(movieData: MovieDetails) {
    let getMovie = localStorage.getItem('testdata');
    let getMovieObj = JSON.parse(getMovie);
    for (let i = 0; i < getMovieObj.length; i++) {
      if (getMovieObj[i].movieTitle === movieData.movieTitle && getMovieObj[i].genre === movieData.genre) {
        getMovieObj[i].rating = movieData.rating;
      }
    }
    localStorage.setItem('testdata', JSON.stringify(getMovieObj));
      return true;
  }
  public getData() {
    let movieList: MovieDetails[] = [];
    let dataObj: MovieDetails[] = [];
    let temp = localStorage.getItem('testdata');
    dataObj = JSON.parse(temp);
    if (this.mockDataEnabled === false && dataObj[3].id !== 'mockdata') {
      for (let i in MOCKDATA) {
        if (MOCKDATA[i]) {
          dataObj.push(MOCKDATA[i]);
        }
      }
      localStorage.setItem('testdata', JSON.stringify(dataObj));
      this.mockDataEnabled = true;
    }
    if (localStorage.getItem('testdata')) {
      let data = localStorage.getItem('testdata');
      this.arrTemp = JSON.parse(data);
      for (let j in this.arrTemp) {
        if (this.arrTemp[j]) {
          movieList.push(this.arrTemp[j]);
        }
      }
      return movieList;
    }
  }
}
