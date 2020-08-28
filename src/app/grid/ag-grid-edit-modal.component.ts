import { Component, OnInit } from '@angular/core';
import { SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyModalInstance } from '@skyux/modals';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellEditorParams
} from 'ag-grid-community';
import { SkyAgGridDemoRow } from '../Models/ag-grid-demo-data';
import { AgGridEditModalContextComponent } from './ag-grid-edit-modal-context.component';

@Component({
  selector: 'app-ag-grid-edit-modal',
  templateUrl: './ag-grid-edit-modal.component.html'
})
export class AgGridEditModalComponent implements OnInit {
  public gridData: SkyAgGridDemoRow[];
  public columnDefs: ColDef[];
  public gridOptions: GridOptions;
  public gridApi: GridApi;

  constructor(
    private agGridService: SkyAgGridService,
    public context: AgGridEditModalContextComponent,
    public instance: SkyModalInstance
  ) {}

  public ngOnInit(): void {
    this.gridData = this.context.gridData;
    this.columnDefs = [
      {
        field: 'movieTitle',
        headerName: 'Movie Name',
        type: SkyCellType.Text
      },
      {
        field: 'genre',
        headerName: 'Genre',
        type: SkyCellType.Text,
        sort: 'asc'
      },
      {
        field: 'rating',
        headerName: 'Rating',
        type: SkyCellType.Number,
        editable: true,
        cellEditorParams: (params: ICellEditorParams): any => {
          return { skyComponentProperties: { minDate: params.data.startDate } };
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

  public onGridReady(gridReadyEvent: GridReadyEvent) {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }
}
