import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { participantdashModel } from './participantdash.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  formValue !: FormGroup;
  participantmodelObj: participantdashModel = new participantdashModel();
  participantData !: any;
  showAdd !: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      income: [''],
    })
    this.getAllParticipant(); // Calling method
  }

  //To show and hide Update button:
  clickAddParticipant() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // for posting data:
  postParticipantDetails() {
    this.participantmodelObj.firstName = this.formValue.value.firstName;
    this.participantmodelObj.lastName = this.formValue.value.lastName;
    this.participantmodelObj.email = this.formValue.value.email;
    this.participantmodelObj.mobile = this.formValue.value.mobile;
    this.participantmodelObj.income = this.formValue.value.income;

    this.api.postParticipant(this.participantmodelObj)
      .subscribe(res => {
        console.log(res);
        alert("Participant added succesfully!");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllParticipant();
      }, () => {
        alert("Something went wrong");
      })

  }

  // Get all participant on board:
  getAllParticipant() {
    this.api.getParticipant()
      .subscribe(res => {
        this.participantData = res;
      })
  }
  // To delete participant:
  deleteParticipants(row: any) {
    this.api.deleteParticipant(row.id)
      .subscribe(res => {
        alert("participant deleted!");
        this.getAllParticipant();
      })
  }

  //To edit and update the details:

  onEdit(row: any) {
    // for show and hide add and update button:
    this.showAdd = false;
    this.showUpdate = true; //till here
    this.participantmodelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['income'].setValue(row.income);
  }
  //To update the deatils:
  updateParticipant() {
    this.participantmodelObj.firstName = this.formValue.value.firstName;
    this.participantmodelObj.lastName = this.formValue.value.lastName;
    this.participantmodelObj.email = this.formValue.value.email;
    this.participantmodelObj.mobile = this.formValue.value.mobile;
    this.participantmodelObj.income = this.formValue.value.income;

    this.api.updateParticipant(this.participantmodelObj, this.participantmodelObj.id)
      .subscribe(res => {
        alert("Updated Successfully!");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllParticipant();
      })
  }

}
