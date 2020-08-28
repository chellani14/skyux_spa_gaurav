import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalCloseArgs, SkyModalService, SkyConfirmInstance, SkyConfirmService, SkyConfirmType } from '@skyux/modals';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { MovieDetails } from '../Models/movie-details';
import { AgGridEditModalContextComponent } from './ag-grid-edit-modal-context.component';
import { AgGridEditModalComponent } from './ag-grid-edit-modal.component';
import { EditGridModalContext } from './grid-edit-context';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { DataService } from '../shared/data.service';
import { SkyLibResourcesService } from '@skyux/i18n';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html'
})
export class AgGridComponent implements OnInit, OnChanges {
  @Input() public movieListDetails: MovieDetails[];
  public gridData: MovieDetails[];
  public currentPage = 1;
  public addNewMovieString: string;
  public editString: string;
  public ratingString: string;

  public columnDefs = [
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: AgGridEditModalContextComponent,
      cellRendererParams: {
        ratingEdit: this.editMovie.bind(this),
        deleteMovie: this.deleteMovie.bind(this)
      }
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
      headerName: 'Rating' ,
      type: SkyCellType.Number,
      sort: 'des'
    }
  ];

  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public searchText: string;

  constructor(
    private agGridService: SkyAgGridService ,
     private modalService: SkyModalService,
     private dataService: DataService,
     private resources: SkyLibResourcesService,
     private confirmService: SkyConfirmService
  ) { }

  public ngOnInit(): void {
    this.localization();
    this.gridOptions = {
      columnDefs: this.columnDefs,
      pagination: true,
      paginationPageSize: 8,
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
  public ngOnChanges(): void {
    this.gridData = this.movieListDetails;
    this.dataService.getData();
    console.log(this.movieListDetails);
  }
  public addMovie() {
    let  movieModel = new MovieDetails();
    movieModel.id = Date.now().toString();
    movieModel.rating = 0;
    movieModel.genre = '';
    movieModel.movieTitle = '' ;
  movieModel.selected = false;
  let demoMovie: MovieDetails[];
  demoMovie = [movieModel];
    const context = new EditGridModalContext();
    context.gridData = demoMovie;
    const options: any = {
      providers: [{ provide: EditGridModalContext, useValue: context }],
      ariaDescribedBy: 'docs-edit-grid-modal-content'
    };

    const modalInstance = this.modalService.open(AddMovieComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel') {
        alert('Edits canceled!');
      } else {
        console.log(result.data[0]);
       this.dataService.saveData(result.data[0]);
        alert('Saving data!');
        this.gridApi.refreshCells();
      }
    });

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
        this.gridApi.refreshCells();
      }
    });
  }
  public searchApplied(searchText: string) {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }

  public localization() {
    this.dataService.subject$.subscribe((res) => {
      console.log(res);
      if (res === 'hi_IN') {
        this.addNewMovieString = this.resources.getStringForLocale(
          { locale: 'hi_IN' }, 'add_new_movie'
        );
        this.editString = this.resources.getStringForLocale(
          { locale: 'hi_IN' }, 'edit_all_movies'
        );
      }
      if (res === 'en_US') {
        this.addNewMovieString = this.resources.getStringForLocale(
          { locale: 'en_US' }, 'add_new_movie'
        );
        this.editString = this.resources.getStringForLocale(
          { locale: 'en_US' }, 'edit_all_movies'
        );
      }
    });
  }
  public deleteMovie(movie: MovieDetails) {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you want to delete',
      type: SkyConfirmType.YesCancel
    });
    dialog.closed.subscribe((result: any) => {
      if (result.action === 'yes') {
        let res = this.dataService.deleteMovie(movie);
        if (res) {
          this.gridData = this.dataService.getData();
          this.gridApi.refreshCells();
          alert('Deleted Successfully');
        }
      }
    });
  }

  public editMovie(movie: MovieDetails) {
    const context = new EditGridModalContext();
    context.gridData = [movie];
    const options: any = {
      providers: [{ provide: EditGridModalContext, useValue: context }],
      ariaDescribedBy: 'docs-edit-grid-modal-content',
      size: 'large'
    };

    const modalInstance = this.modalService.open(AddMovieComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel') {
        alert('Edits canceled!');
      } else {
        console.log(result.data[0]);
       let results = this.dataService.editMovie(result.data[0]);
       if (results) {
         this.gridData = this.dataService.getData();

        this.gridApi.refreshCells();
        alert('Saving data!');
        this.gridApi.refreshCells();
       }
      }
    });
  }
}
