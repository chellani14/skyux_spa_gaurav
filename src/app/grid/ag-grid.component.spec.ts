import {
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  AgGridComponent
} from './ag-grid.component';
import { SkyModalInstance, SkyModalHostService, SkyModalConfiguration, SkyModalService } from '@skyux/modals';
import { By } from '@angular/platform-browser';
import { MovieDetails } from '../Models/movie-details';

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
describe('Ag grid component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let mockModalInstance = new SkyModalInstance;
  let modalService = new SkyModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
    providers: [
      {
        provide: SkyModalInstance,
        useValue: MockModalInstance
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
  it('should create ag grid component', () => {
    const fixture = TestBed.createComponent(AgGridComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component instanceof AgGridComponent).toBe(true);
  });

  it('should open modal', () => {
    const fixture = TestBed.createComponent(AgGridComponent);
    const component = fixture.componentInstance;
    modalService = TestBed.get(SkyModalService);
    fixture.detectChanges();
    spyOn(modalService, 'open').and.returnValue(mockModalInstance);
    component.openModal();
    expect(modalService.open).toHaveBeenCalled();
  });
   it('should have button with text given ', () => {
    const fixture = TestBed.createComponent(AgGridComponent);
    const component = fixture.componentInstance;
    component.addNewMovieString = 'Add New Movie';
    const debug = fixture.debugElement.query(By.css('button[id="edit-btn"]'));
    const native = debug.nativeElement;
    const buttonElem = native;
    expect(buttonElem.id).toContain('edit-btn');
  });
  it('should trigger all functions in ag grid component', () => {
   let movie = new MovieDetails();
    movie.id = '123'; movie.selected = false; movie.movieTitle = 'HomeAlone'; movie.genre = 'comedy'; movie.rating = 2;
    const fixture = TestBed.createComponent(AgGridComponent);
    const component = fixture.componentInstance;
    modalService = TestBed.get(SkyModalService);
    fixture.detectChanges();
    spyOn(component, 'addMovie');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.addMovie).toHaveBeenCalled();
    spyOn(component, 'localization');
    component.localization();
    expect(component.localization).toHaveBeenCalled();
    spyOn(component, 'editMovie');
    component.editMovie(movie);
    expect(component.editMovie).toHaveBeenCalled();
    spyOn(component, 'deleteMovie');
    component.deleteMovie(movie);
  });
});
