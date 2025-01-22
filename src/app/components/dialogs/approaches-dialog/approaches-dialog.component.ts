import { Component, Inject, OnInit, signal  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomerlistInterface } from '../../../models/mercadeo/customerlist-interface';
import { MatOption, MatSelect } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-customersdialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule
  ],
  providers: [ 
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
 ],
  templateUrl: './approaches-dialog.component.html',
  styleUrl: './approaches-dialog.component.css'
})

export class ApproachesDialogComponent implements OnInit {
  interstTopicForm = new FormControl('');
  interstTopicSocialMediaForm = new FormControl('');
  socialMediaTopicForm = new FormControl('');
  title: string ="";
  interstTopicOther: string ="";
  public contactCustomerForm!: FormGroup;

  ngOnInit() {
    // Inicialización del FormGroup
    this.contactCustomerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      observations: new FormControl(''),
      gender: new FormControl(''),
      birthDate: new FormControl(''),
    });
  }

  constructor(
      private readonly formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: CustomerlistInterface
  ) {
    this.title = "Crear acercamiento con " + data.name.split(' ')[0].toLowerCase();
  }


  selectedValue: string= '';
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'No contesta'},
    {value: 'pizza-1', viewValue: 'No quiso dar informacion'},
    {value: 'Volver a contactar', viewValue: 'Volver a contactar'},
    {value: 'otro', viewValue: 'Otro'},
  ];

 

  onSend(){
    console.log("Sending");
    console.log(this.interstTopicForm.value);
  }
}
