import { ApplicationRef } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { SkyModalService } from '@skyux/modals';
import { SkyGridEditModalComponent } from './sky-grid-edit-modal.component';

describe('Sky grid edit modal component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let applicationRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
  });

  beforeEach(inject(
    [SkyModalService, ApplicationRef],
    (_modalService: SkyModalService, _applicationRef: ApplicationRef) => {
      _modalService.dispose();
      applicationRef = _applicationRef;
    }
  ));
  it('Modal component should be created', () => {
    const fixture = TestBed.createComponent(SkyGridEditModalComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    expect(component instanceof SkyGridEditModalComponent).toBe(true);
  });
  it('should launch and save data with the modal', fakeAsync(() => {
    const fixture = TestBed.createComponent(SkyGridEditModalComponent);
    fixture.detectChanges();
    tick();
    let launchModalButtonEl = fixture.nativeElement.querySelector(
      '.sky-btn.sky-test-modal-launch'
    ) as HTMLButtonElement;
    launchModalButtonEl.click();
    applicationRef.tick();
    let saveButton = document.querySelector(
      '.sky-test-modal-save'
    ) as HTMLButtonElement;
    expect(saveButton).not.toBeNull();
    saveButton.click();
    applicationRef.tick();
    fixture.detectChanges();
  }));
});
