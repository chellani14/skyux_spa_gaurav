import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MovieDetails } from '../Models/movie-details';

@Component({
  selector: 'app-ag-grid-edit-modal-context',
  templateUrl: './ag-grid-edit-modal-context.component.html'
})
export class AgGridEditModalContextComponent
  implements ICellRendererAngularComp {
  private movie: MovieDetails = new MovieDetails();
  public gridData: MovieDetails[];
  private para: any;
  private params: ICellRendererParams;
  constructor() {}
  public agInit(params: ICellRendererParams): void {
    this.para = params;
    this.params = params;
    this.movie.id = this.params.data && this.params.data.id;
    this.movie.movieTitle = this.params.data && this.params.data.movieTitle;
    this.movie.genre = this.params.data && this.params.data.genre;
    this.movie.rating = this.params.data && this.params.data.rating;
  }

  public refresh(): boolean {
    return false;
  }

  public actionClicked(action: string): void {
    if (action === 'Edit') {
      this.para.ratingEdit(this.movie);
    } else if (action === 'Delete') {
      this.para.deleteMovie(this.movie);
    }
  }
}
