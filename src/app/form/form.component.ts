import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkyValidators } from '@skyux/validation';
import { DataService } from '../Data.service';
import { FormDetails } from '../Models/formdetails';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public reactiveForm: FormGroup = new FormGroup({});
  public user: FormDetails = new FormDetails();
  public userListDetails: FormDetails[] = [];
  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }
  public ngOnInit(): void {
    this.getUserData();
    this.reactiveForm = this.formBuilder.group({
      'id': [Date.now()],
      'FirstName': [this.user.firstname, [Validators.required, Validators.minLength(3),
      Validators.maxLength(15)]],
      'LastName': [this.user.lastname, [Validators.required]],
      'Email': [this.user.email, [Validators.required, SkyValidators.email]],
      'DOB': [this.user.dob],
      'Contact': [this.user.contact, [Validators.required]],
      'Address': [this.user.address, [Validators.required]]
    });
  }
  public postData() {
    this.dataService.saveData(this.reactiveForm.value);
    this.getUserData();
    this.Reset();
  }
  private Reset() {
    this.reactiveForm.reset();
  }
  private getUserData() {
    this.userListDetails = [];
    this.userListDetails = this.dataService.getData();
  }
}
