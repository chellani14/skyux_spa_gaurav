import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { SkyAgGridService, SkyCellType } from "@skyux/ag-grid";
import { SkyModalCloseArgs, SkyModalService } from "@skyux/modals";
import { GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import { FormDetails } from "../../Models/formdetails";
import { SkyGridContentMenuComponent } from "./sky-grid-content-menu/sky-grid-content-menu.component";
import { SkyDataEntryGridEditModalContext } from "./sky-grid-edit-modal/sky-grid-edit-modal-context";
import { SkyGridEditModalComponent } from "./sky-grid-edit-modal/sky-grid-edit-modal.component";
@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html" 
})
export class GridComponent implements OnInit, OnChanges {
  public gridApi: GridApi;
  public gridOptions: GridOptions;
  @Input() public userListDetails: FormDetails[];
  public gridData: FormDetails[];
  public searchText: string;
  public columnDefs = [
    {
      field: "selected",
      type: SkyCellType.RowSelector,
    },
    {
      colId: "context",
      headerName: "",
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: SkyGridContentMenuComponent,
    },
    {
      field: "FirstName",
      headerName: "FirstName",
    },
    {
      field: "LastName",
      headerName: "LastName",
    },
    {
      field: "DOB",
      headerName: "DOB",
      type: SkyCellType.Date,
    },
    {
      field: "Email",
      headerName: "Email",
    },
    {
      field: "Contact",
      headerName: "Contact",
    },
    {
      field: "Address",
      headerName: "Address",
    },
  ];

  constructor(
    private agGridService: SkyAgGridService,
    private modalService: SkyModalService
  ) {}

  public ngOnChanges() {
    this.gridData = this.userListDetails;
  }
  public ngOnInit() {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent),
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions,
    });
  }
  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
  }
  public openModal(): void {
    const context = new SkyDataEntryGridEditModalContext();
    context.gridData = this.gridData;

    const options = {
      providers: [
        { provide: SkyDataEntryGridEditModalContext, useValue: context },
      ],
      ariaDescribedBy: "docs-edit-grid-modal-content",
      size: "large",
    };

    const modalInstance = this.modalService.open(
      SkyGridEditModalComponent,
      options
    );

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === "cancel" || result.reason === "close") {
        alert("Edits canceled!");
      } else {
        this.gridData = result.data;
        this.gridApi.refreshCells();
        alert("Saving data!");
      }
    });
  }
  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    this.gridApi.setQuickFilter(searchText);
  }
}
