import { async, TestBed } from "@angular/core/testing";
import { SkyAppTestModule } from "@skyux-sdk/builder/runtime/testing/browser";
import { expect } from "@skyux-sdk/testing";
import { AgGridModule } from "ag-grid-angular";
import { GridComponent } from "./grid.component";

describe("Grid component", () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule, AgGridModule.withComponents([])],
    });
  });
  it("the grid cells should be as expected", () => {
    const fixture = TestBed.createComponent(GridComponent);

    fixture.detectChanges();
    let component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.columnDefs.length).toEqual(8);
    expect(component.columnDefs[0].field).toContain("selected");
    expect(component.columnDefs[2].field).toContain("FirstName");
    expect(component.columnDefs[3].field).toContain("LastName");
    expect(component.columnDefs[4].field).toContain("DOB");
    expect(component.columnDefs[5].field).toContain("Email");
    expect(component.columnDefs[6].field).toContain("Contact");
    expect(component.columnDefs[7].field).toContain("Address");
  });
  it("Grid component should be created", () => {
    const fixture = TestBed.createComponent(GridComponent);

    fixture.detectChanges();
    let component = fixture.componentInstance;

    expect(component instanceof GridComponent).toBe(true);
  });

  it("should do something", () => {
    const fixture = TestBed.createComponent(GridComponent);

    fixture.detectChanges();

    expect(false).toBe(false);
  });

  it("gridoptions not available name field validity", () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
   
    const elm = fixture.nativeElement;
    const grid = elm.querySelector("ag-grid-angular");
    const firstRowCells = grid.querySelectorAll(
      'div[row-id="0"] div.ag-cell-value'
    );
    const values = Array.from(firstRowCells).map((cell: any) => cell);

    expect(values[0].selected).toEqual(true);
  });
  it("first row should have expected data", () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    const elm = fixture.nativeElement;
    const grid = elm.querySelector("ag-grid-angular");
    const firstRowCells = grid.querySelectorAll(
      'div[row-id="0"] div.ag-cell-value'
    );
    const values = Array.from(firstRowCells).map((cell: any) =>
      cell.textContent.trim()
    );
    expect(values).toEqual(["1", "10"]);
  });
  it("should call onGridReady function", async(() => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    spyOn(component, "onGridReady");

    fixture.whenStable().then(() => {
      expect(component.onGridReady).toHaveBeenCalled();
    });
  }));
});
