import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface ScheduleData {
  Task: string;
  Date: string;
  Time: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scheduleList = [];
  scheduleData: ScheduleData;
  scheduleForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.scheduleData = {} as ScheduleData;
  }

  ngOnInit(){
    this.scheduleForm = this.fb.group({
      Task: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Time: ['', [Validators.required]],
    })
    this.firebaseService.read_schedule().subscribe(data => {

      this.scheduleList = data.map(e =>{
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Task: e.payload.doc.data()['Task'],
          Date: e.payload.doc.data()['Date'],
          Time: e.payload.doc.data()['Time']
        };
      })
    });
  }

  CreateRecord() {
    this.firebaseService.create_schedule(this.scheduleForm.value)
      .then(resp => {
        //Reset form
        this.scheduleForm.reset();
      })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_schedule(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditTask = record.Task;
    record.EditDate = record.Date;
    record.EditTime = record.Time;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Task'] = recordRow.EditName;
    record['Date'] = recordRow.EditDate;
    record['Time'] = recordRow.EditTime;
    this.firebaseService.update_schedule(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
