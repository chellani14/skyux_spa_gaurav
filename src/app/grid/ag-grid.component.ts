import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { MovieDetails } from '../Models/movie-details';
import { AgGridEditModalContextComponent } from './ag-grid-edit-modal-context.component';
import { AgGridEditModalComponent } from './ag-grid-edit-modal.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html'
})
export class AgGridComponent implements OnInit, OnChanges {
  @Input() public movieListDetails: MovieDetails[];
  public gridData: MovieDetails[];
  public currentPage = 1;

  public columnDefs = [
    {
      field: 'selected',
      headerName: '',
      sortable: false,
      type: SkyCellType.RowSelector
    },
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: AgGridEditModalContextComponent
    },
    {
      field: 'movieTitle',
      headerName: 'Movie'
    },
    {
      field: 'genre',
      headerName: 'Genre',
      type: SkyCellType.Text
    },
    {
      field: 'rating',
      headerName: 'Rating',
      type: SkyCellType.Number,
      sort: 'asc'
    }
  ];

  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public searchText: string;

  constructor(
    private agGridService: SkyAgGridService ,
     private modalService: SkyModalService
  ) {}
  public ngOnChanges(): void {
    this.gridData = this.movieListDetails;
    console.log(this.movieListDetails);
    // this.gridData=[{'selected': true, 'movieTitle': 'SUHDLO', 'genre': 'comedy', 'rating': 5}];
  }

  public ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions
    });
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }
  public openModal(): void {
    const context = new AgGridEditModalContextComponent();
    context.gridData = this.gridData;

    const options: any = {
      providers: [{ provide: AgGridEditModalContextComponent, useValue: context }],
      ariaDescribedBy: 'docs-edit-grid-modal-content',
      size: 'large'
    };

    const modalInstance = this.modalService.open(AgGridEditModalComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel') {
        alert('Edits canceled!');
      } else {
        alert('Saving data!');
        // this.gridData = result.data;
        this.gridApi.refreshCells();
      }
    });
  }
  public searchApplied(searchText: string) {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }
}
