import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Request } from './SignUpRequest';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	private baseUrl = 'http://localhost:8080/healthcare/';
	isLoggedIn = false;
	 tokenExpirationTime = 5000000; // 5 seconds
     expirationTimestamp = Date.now() + this.tokenExpirationTime;


	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	signin(email: any,password: any): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signin', {email,password}, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
			sessionStorage.setItem("email",resp.email)
this.setId(resp.user.id)
sessionStorage.setItem("username",resp.user.username)
sessionStorage.setItem("phone_number",resp.user.phone_number)
sessionStorage.setItem("role",resp.user.userRoles[0].roleName)

sessionStorage.setItem("token",`Bearer ${resp.token}`)

		  this.setRoles(resp.user.userRoles)

		  setTimeout(() => {
			sessionStorage.removeItem("token");
		  }, 5000000); 
		  setTimeout(() => {
			sessionStorage.removeItem("email");
		  }, 5000000);

		  
			return resp;
		}));
		this.isLoggedIn = true;
	}

	public setRoles(roles: []) {
		sessionStorage.setItem('roles', JSON.stringify(roles));
	  }
	  public setId(id:string) {
		sessionStorage.setItem('id', JSON.stringify(id));
	  }

	  public getId(): number {
		const id = sessionStorage.getItem('id');
     if (id !== null) {
       return JSON.parse(id);
        }
     return 0;
	  }

	  public getRoles(): [] {
		const roles = sessionStorage.getItem('roles');
     if (roles !== null) {
       return JSON.parse(roles);
        }
     return [];
	  }

	  public setUsername(username:string) {
		sessionStorage.setItem('username', JSON.stringify(username));
	  }

	  public getUsername(): string {
		const username = sessionStorage.getItem('username');
     if (username !== null) {
       return JSON.parse(username);
        }
     return "null";
	  }

	signup(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}


	
	userActive(email: any,password: any): Observable<any>{
		return this.http.post<any>(`${this.baseUrl}active`,{email,password}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }

	  getCurrentUser() {
		const username = sessionStorage.getItem('username');
		if (username !== null) {
		  return JSON.parse(username);
		}
		return;
	  }
	


	activeAccount(mail: any,code: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}activated`,{mail,code}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }
	
	  checkEmail(email: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}checkEmail`,{email}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }
	
	  resetPassword(email: any,code: any,password: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}resetPassword`,{email,code,password}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }

	signout() {
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('id');

		sessionStorage.removeItem('token');
sessionStorage.removeItem('roles');
sessionStorage.removeItem('username');
sessionStorage.removeItem('role');
sessionStorage.removeItem('phone_number');



		this.router.navigateByUrl('/login');

	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
		
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
		
	}
	getSignInPhoneNumber() {
		return sessionStorage.getItem('phone_number') as string;
		
	}
	isLogin(){
		return !(sessionStorage.getItem('email') == null ||
			   sessionStorage.getItem('token') == null);
	  }
	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}

}