import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignedin = false;

	signedinUser: string = '';
	username:any []= [];

	greeting: any[] = [];

	constructor(private route: ActivatedRoute,private auth: AuthService,private router: Router, private http: HttpClient, public authService: AuthService) {}

	ngOnInit() {
		this.isSignedin = this.auth.isUserSignedin();

		
	}

	doSignout() {
		this.authService.signout();
	}

}
