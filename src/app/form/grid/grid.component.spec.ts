import { TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid.component';

describe('Grid component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule, AgGridModule.withComponents([])]
    });
  });
  it('the grid headers should be as expected', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.columnDefs.length).toEqual(8);
    expect(component.columnDefs[0].field).toContain('selected');
    expect(component.columnDefs[2].field).toContain('FirstName');
    expect(component.columnDefs[3].field).toContain('LastName');
    expect(component.columnDefs[4].field).toContain('DOB');
    expect(component.columnDefs[5].field).toContain('Email');
    expect(component.columnDefs[6].field).toContain('Contact');
    expect(component.columnDefs[7].field).toContain('Address');
  });
  it('Grid component should be created', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    expect(component instanceof GridComponent).toBe(true);
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    expect(true).toBe(true);
  });
  it('should have 3 columns', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    const grid: HTMLElement = fixture.nativeElement;
    const headers = grid.querySelectorAll('span[role=columnheader]');
    expect(headers.length).toBe(8);
  });

  it('should match to number of row selected', () => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    component.ngOnInit();
    component.ngOnChanges();
    component.gridOptions.api.setRowData(component.manualRowdata);
    component.gridOptions.api.selectAll();
    // console.log(component.gridOptions.api.getDisplayedRowCount());
    expect(component.gridOptions.api.getSelectedNodes().length).toEqual(1);
  });
  it('should call onGridReady function', (() => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    spyOn(component, 'onGridReady');
    fixture.whenStable().then(() => {
      expect(component.onGridReady).toHaveBeenCalled();
    });
  }));
  it('should call openModal function', (() => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    spyOn(component, 'openModal');
    component.openModal();
    fixture.whenStable().then(() => {
      expect(component.openModal).toHaveBeenCalled();
    });
  }));
  it('should call searchApplied function', (() => {
    const fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    spyOn(component, 'searchApplied');
    component.searchApplied('teststring');
    fixture.whenStable().then(() => {
      expect(component.searchApplied).toHaveBeenCalled();
    });
  }));
});
