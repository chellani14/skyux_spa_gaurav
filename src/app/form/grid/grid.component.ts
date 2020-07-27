import { Component, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { SKY_AG_GRID_DEMO_DATA } from './grid_manual_data';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
public gridApi: GridApi;
public gridOptions: GridOptions;
// @Input() userListDetails: FormDetails[];
public gridData = SKY_AG_GRID_DEMO_DATA;
public columnDefs = [
    {
      field: 'selected',
      type: SkyCellType.RowSelector
    },
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false
    },
    {
      field: 'name',
      headerName: 'Name'
    },
    {
      field: 'age',
      headerName: 'Age',
      type: SkyCellType.Number,
      maxWidth: 60
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: SkyCellType.Date,
      sort: 'asc'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: SkyCellType.Date
    },
    {
      field: 'department',
      headerName: 'Department',
      type: SkyCellType.Autocomplete
    },
    {
      field: 'jobTitle',
      headerName: 'Title',
      type: SkyCellType.Autocomplete
    }
  ];
  constructor(private agGridService: SkyAgGridService) {}
  // ngOnChanges() {
  //   this.gridData = this.userListDetails;
  // }
  public ngOnInit() {
   this.gridOptions = {
     columnDefs: this.columnDefs,
     onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
  }
public onGridReady(gridReadyEvent: GridReadyEvent): void {
  this.gridApi = gridReadyEvent.api;
  this.gridApi.sizeColumnsToFit();
}
}
