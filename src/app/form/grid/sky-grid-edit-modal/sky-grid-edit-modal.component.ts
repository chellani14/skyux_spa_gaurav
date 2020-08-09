import { Component, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalInstance } from '@skyux/modals';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';
import { SkyAgGridDemoRow } from '../grid_manual_data';

@Component({
  selector: 'app-sky-grid-edit-modal',
  templateUrl: './sky-grid-edit-modal.component.html'
})
export class SkyGridEditModalComponent implements OnInit {
  public columnDefs: ColDef[];
  public gridApi: GridApi;
  public gridData: SkyAgGridDemoRow[];
  public gridOptions: GridOptions;

  constructor(
    private agGridService: SkyAgGridService,
    public instance: SkyModalInstance
  ) {}

  public ngOnInit(): void {
    this.columnDefs = [
      { headerName: 'firstname', field: 'firstname' },
      { headerName: 'lastname', field: 'lastname' },
      {
        headerName: 'contact',
        field: 'contact',
        sortable: true,
        filter: true,
        type: SkyCellType.Number,
        maxWidth: 200,
        editable: true
      },
      {
        headerName: 'email',
        field: 'email',
        sortable: false,
        filter: true,
        editable: true
      },
      { headerName: 'dob', field: 'dob', type: SkyCellType.Date },
      { headerName: 'address', field: 'address', editable: true }
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
