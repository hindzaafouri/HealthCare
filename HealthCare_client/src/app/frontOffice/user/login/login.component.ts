import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
	

	isSignedin = false;

	error: string = '';
	checkoutParentGroup!: FormGroup;

	constructor(private formChildGroup: FormBuilder,private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

	ngOnInit() : void {
		this.isSignedin = this.auth.isUserSignedin();

		if(this.isSignedin) {
			this.router.navigateByUrl('home');
			
		}
		this.myFormLogin()
	}
	
	
	  myFormLogin(){
		this.checkoutParentGroup = this.formChildGroup.group({
		  user:this.formChildGroup.group({
			email: new FormControl('',[
			  Validators.required,
			  Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
			]),
			password: new FormControl('',[
			  Validators.required
			])
		  })
		})
	  }

	doSignin() {if(this.checkoutParentGroup.invalid){
		this.checkoutParentGroup.markAllAsTouched()
		return;
	  }
	  this.auth.userActive(
		this.checkoutParentGroup.controls['user'].value.email,
		this.checkoutParentGroup.controls['user'].value.password
	  ).subscribe({
		next: response =>{
		  let ac = response.active;
		  console.log('ac:', ac);

		  if(ac == 1){
			this.auth.signin(
			  this.checkoutParentGroup.controls['user'].value.email,
			  this.checkoutParentGroup.controls['user'].value.password
			).subscribe({
			  next: response =>{
				let role = response.userRoles;
				let name=response.user.userRoles[0].roleName;
				console.log('role:', name);
                console.log(sessionStorage.getItem("id"));
				if (name === 'Patient') {
				  this.router.navigateByUrl('/front');
				} else {
				  this.router.navigateByUrl('/admin');
				}			  }
			})
		  } else if(ac === 0){
			sessionStorage.setItem("emailActive",this.checkoutParentGroup.controls['user'].value.email)
			this.router.navigateByUrl("/active")
		  } else {
			alert("Invalid Email or Password")
		  }
		}
	  })
	  this.isSignedin = true;
    return true;
	}
  
	  get email(){
    return this.checkoutParentGroup.get('user.email')
  }
  get password(){
    return this.checkoutParentGroup.get('user.password')
  }
	

	/*signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
		  data => {
			this.social.loginWithGoogle(data.idToken).subscribe({
			  next: response =>{
				this.router.navigateByUrl("home")
			  }
			})
			console.log(data.idToken)
		  }
		);
	  }*/

}
