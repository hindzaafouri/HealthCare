import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../SignUpRequest';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent  implements OnInit {
  constructor(private authService: UserService,private route: ActivatedRoute, private router: Router) { }

	username: string = '';
	password: string = '';
  email: string = '';
	phone_number: string = '';

	user_roles: any = [
		{name:'Patient', value:'Patient', selected: false},
		{name:'Doctor', value:'Doctor', selected: false},
	]

	selectedRoles: string[] = [];

	error: string = '';
	success: string = '';
	showAdditionalInputs: boolean = false;
	options: string[] = ['Option 1', 'Option 2', 'Option 3'];
	selectedOption: string ='';

	ngOnInit(): void {
	}

	onChangeCategory(event: any, role: any) {
		// set the selected state of the role based on the checkbox state
		this.selectedRoles.push(role.value);
		
		// check if the "Doctor" role is selected
		if (role.name === 'Doctor' && role.selected) {
		  this.showAdditionalInputs = true;
		} else {
		  this.showAdditionalInputs = false;
		}
	  }

	doSignup() {
		if(this.username !== '' && this.username !== null && this.password !== '' && this.password !== null && this.selectedRoles.length > 0) {
			const request: Request = { username: this.username, password: this.password,email: this.email,Phone_number: this.phone_number, roles: this.selectedRoles};

			this.authService.signup(request).subscribe((result)=> {
				//console.log(result);
				//this.success = 'Signup successful';
        this.router.navigateByUrl('/user_list');
				this.success = result;
			}, (err) => {
				//console.log(err);
				this.error = 'Something went wrong during signup';
			});
		} else {
			this.error = 'All fields are mandatory';
		}
	}

}
