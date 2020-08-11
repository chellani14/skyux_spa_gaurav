import { TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { SkyGridContentMenuComponent } from './sky-grid-content-menu.component';

describe('Sky grid content menu component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
    });
  });

  it('should trigger actionClicked() when click on Delete, Mark inactive, More info.', (() => {
    const fixture = TestBed.createComponent(SkyGridContentMenuComponent);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    spyOn(component, 'actionClicked');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.actionClicked).toHaveBeenCalled();
    });
  }));
});
