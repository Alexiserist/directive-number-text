import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'directive-input';
  dataForm : FormGroup;

  constructor(
    private formBuilder:FormBuilder,

  ){
    this.dataForm = this.formBuilder.group({
      input: [null],
      input2: [null],

    })
  }
}
