import {
  TestBed
} from '@angular/core/testing';
import {
  expect
} from '@skyux-sdk/testing';

import {
  AgGridEditModalComponent
} from './ag-grid-edit-modal.component';

describe('Ag grid edit modal component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  it('should do something', () => {
    const fixture = TestBed.createComponent(AgGridEditModalComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
