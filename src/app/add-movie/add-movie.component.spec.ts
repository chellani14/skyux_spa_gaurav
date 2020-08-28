import { TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { AddMovieComponent } from './add-movie.component';
import { SkyModalInstance, SkyModalHostService, SkyModalConfiguration } from '@skyux/modals';
class MockModalConfiguration {
  constructor() {}
}
class MockModalInstance {
  public saveResult: any;
  constructor() {}
  public save(result?: any) {
    this.saveResult = result;
  }
}
class MockModalHostService {
  constructor() {}
  public getModalZIndex() {}
}
describe('Add movie component', () => {
  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let mockModalInstance = new MockModalInstance;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
    providers: [
      {
        provide: SkyModalInstance,
        useValue: mockModalInstance
      },
      {
        provide: SkyModalHostService,
        useValue: new MockModalHostService()
      },
      {
        provide: SkyModalConfiguration,
        useValue: new MockModalConfiguration()
      }
    ]
  });
});

  it('should create ass movie component', () => {

    const fixture = TestBed.createComponent(AddMovieComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component instanceof AddMovieComponent).toBe(true);
  });
});
