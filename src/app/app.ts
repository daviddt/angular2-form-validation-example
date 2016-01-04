import { Component } from 'angular2/core';
import {
	FormBuilder,
	Validators,
	Control,
	ControlGroup,
	FORM_DIRECTIVES
} from 'angular2/common';

import { UsernameValidator } from './usernameValidator.ts'

@Component({
	selector: 'my-app',
	template: `
		<form [ngFormModel]="form">
		  <input type="text" ngControl="username" />
		
		  <p *ngIf="username.pending">Fetching data from the server...</p>
		
      <div *ngIf="username.dirty && !username.valid && !username.pending">
        <p *ngIf="username.errors.required">Username is required.</p>
			  <p *ngIf="username.errors.startsWithNumber">Your username can't start with a number</p>
			  <p *ngIf="username.errors.usernameTaken">This username is taken</p>
      </div>
      
		  <button (click)="submitData()" [disabled]="!form.valid" class="btn btn-primary">Sumbit data</button>
		</form>
	`,
	directives: [FORM_DIRECTIVES]
})

class App {
	
	form: ControlGroup;
	
	username: Control;
	email: Control;
	asyncEmail: Control;
	
	constructor(private builder: FormBuilder) {
		
		this.username = new Control(
			"", 
			Validators.compose([Validators.required, UsernameValidator.startsWithNumber]),
			UsernameValidator.usernameTaken
		);
		
		this.form = builder.group({
			username:  this.username
		});
	}	
	
	submitData(){
     	console.log(JSON.stringify(this.form.value))
    }
};

export default App;
