import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private baseUrl = 'http://localhost:8080/healthcare/social';

  constructor(private http: HttpClient,
              ) { }

  loginWithGoogle(token: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/google`,{token}).pipe(
      map(
        response => {
          sessionStorage.setItem("email",response.email)
          sessionStorage.setItem("token",`Bearer ${response.token}`)
          this.setId(response.user.id)
          sessionStorage.setItem("username",response.user.username)
          sessionStorage.setItem("phone_number",response.user.phone_number)
          sessionStorage.setItem("role",response.user.userRoles[0].roleName)

          this.setId(response.user.id)

          return response;
        }
      )
    )
  }
  
  loginWithFacebook(token: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/facebook`,{token}).pipe(
      map(
        response => {
          sessionStorage.setItem("email",response.email)
          this.setId(response.user.id)
          sessionStorage.setItem("token",`Bearer ${response.token}`)
          sessionStorage.setItem("username",response.user.username)
          sessionStorage.setItem("phone_number",response.user.phone_number)
          sessionStorage.setItem("role",response.user.userRoles[0].roleName)
          return response;
        }
      )
    )
  }

  public setRoles(roles: []) {
		sessionStorage.setItem('roles', JSON.stringify(roles));
	  }
	  public setId(id:string) {
		sessionStorage.setItem('id', JSON.stringify(id));
	  }

	  public getId(): [] {
		const id = sessionStorage.getItem('id');
     if (id !== null) {
       return JSON.parse(id);
        }
     return [];
	  }

	  public getRoles(): [] {
		const roles = sessionStorage.getItem('roles');
     if (roles !== null) {
       return JSON.parse(roles);
        }
     return [];
	  }
}
