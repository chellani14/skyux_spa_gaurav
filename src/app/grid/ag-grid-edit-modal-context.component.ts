import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { MovieDetails } from '../Models/movie-details';

@Component({
  selector: 'app-ag-grid-edit-modal-context',
  templateUrl: './ag-grid-edit-modal-context.component.html'
})
export class AgGridEditModalContextComponent
  implements ICellRendererAngularComp {
  public gridData: MovieDetails[];
  public gridApi: GridApi;

  private params: ICellRendererParams;
  constructor() {}
  public agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params);
  }

  public refresh(): boolean {
    return false;
  }

  public actionClicked(action: string): void {
  }
}
