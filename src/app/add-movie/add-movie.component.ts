import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@skyux/modals';
import { MovieDetails } from '../Models/movie-details';
import { SkyCellType, SkyAgGridService } from '@skyux/ag-grid';
import { ICellEditorParams, ColDef, GridOptions, GridApi, GridReadyEvent } from 'ag-grid-community';
import { EditGridModalContext } from '../grid/grid-edit-context';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit {
  public columnDefs: ColDef[];
  public gridData: MovieDetails[];
  private editableColumn: boolean = false;

  // private instance: SkyModalInstance;
  public movieList2: MovieDetails[] = [];
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  constructor (
    public instance: SkyModalInstance,
    private context: EditGridModalContext,
    private agGridService: SkyAgGridService

  ) {}
  public ngOnInit(): void {
    this.gridData = this.context.gridData;
    if (this.context.gridData[0].movieTitle === '') { this.editableColumn = true; }
        this.columnDefs = [
      {
        field: 'movieTitle',
        headerName: 'Movie Name',
        type: SkyCellType.Text,
        editable: this.editableColumn
      },
      {
        field: 'genre',
        headerName: 'Genre',
        type: SkyCellType.Text,
        sort: 'asc',
        editable: this.editableColumn
      },
      {
        field: 'rating',
        headerName: 'Rating',
        type: SkyCellType.Number,
        editable: true,
        cellEditorParams: (params: ICellEditorParams): any => {
          return { skyComponentProperties: { } };
        }
      }
    ];
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getEditableGridOptions({
      gridOptions: this.gridOptions
    });
  }
  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }
}
