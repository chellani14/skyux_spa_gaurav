import { TestBed } from "@angular/core/testing";
import { SkyAppTestModule } from "@skyux-sdk/builder/runtime/testing/browser";
import { expect } from "@skyux-sdk/testing";
import { FormDetails } from "../Models/formdetails";
import { DataService } from "../shared/data.service";
import { FormComponent } from "./form.component";

describe("Form component", () => {
  let user: FormDetails;

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  let service: DataService;
  beforeEach(() => {
    service = new DataService();
    user = new FormDetails();
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule],
    });
  });
  // describe('DataService', () => {
  //   let service: DataService;

  // beforeEach(() => {
  //   service = new DataService();
  //   });
  // });

  it("Grid component should be created", () => {
    const fixture = TestBed.createComponent(FormComponent);

    fixture.detectChanges();
    let component = fixture.componentInstance;

    expect(component instanceof FormComponent).toBe(true);
  });

  it("should do something", () => {
    const fixture = TestBed.createComponent(FormComponent);

    fixture.detectChanges();

    expect(false).toBe(false);
  });
  it("should render title of form", () => {
    const fixture = TestBed.createComponent(FormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h2").textContent).toContain(
      "registration_title"
    );
  });
  it("should create a record for form", () => {
    user = {
      selected: false,
      address: "werg",
      contact: 123,
      dob: "2020-07-02",
      email: "chellani1@hh.com",
      firstname: "gaurav",
      lastname: "chellani",
      id: "1596012627787",
    };
    let results = service.saveData(user);
    expect(results).toBe(true);
  });
  it("form should be valid", () => {
    const fixture = TestBed.createComponent(FormComponent);
    let component = fixture.componentInstance;
    expect(component.reactiveForm.invalid).toBeFalsy();
  });
  it("name field validity", () => {
    const fixture = TestBed.createComponent(FormComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();
    let name = component.reactiveForm.controls["FirstName"];
    name.setValue('');
    expect(name.hasError("required")).toBeTruthy();

    // expect(form.control.hasError('emailInvalid', ['email'])).toBe(true);
  });
});
