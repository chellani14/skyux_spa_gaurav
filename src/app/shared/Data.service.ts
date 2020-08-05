import { Injectable } from "@angular/core";
import { FormDetails } from "./Models/formdetails";
@Injectable({
  providedIn: "root",
})
export class DataService {
  public userListDetails: FormDetails[] = [];
  public saveData(user: FormDetails) {
    if (localStorage.getItem("testdata")) {
      this.userListDetails = JSON.parse(localStorage.getItem("testdata"));
      this.userListDetails.push(user);
      console.log("appended user list: ", this.userListDetails);
      localStorage.setItem("testdata", JSON.stringify(this.userListDetails));
      console.log(user);
      return true
    } else {
      this.userListDetails.push(user);
      localStorage.setItem("testdata", JSON.stringify(this.userListDetails));
      console.log(user);
      return true
    }
   
  }
  public getData(): FormDetails[] {
    let userList: FormDetails[];
    if (localStorage.getItem("testdata")) {
      let temp = localStorage.getItem("testdata");
      userList = JSON.parse(temp);
      return userList;
    }
  }
}
