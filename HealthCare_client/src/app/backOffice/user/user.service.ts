import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Request } from './SignUpRequest';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:8080/healthcare';


  public registerUser(UserData: any) {
    return this.http.post(this.API + '/signup', UserData);
  }

  public getPatients() {
    return this.http.get(this.API + '/getPatients');
  }


  public getPatient(id :number) {
    return this.http.get<User>(this.API + '/patient/'+id);
}

  getUserById(id :number) {
    return this.http.get<User>(this.API +'/user/'+id)
  }

  public getDoctors() {
    return this.http.get(this.API + '/getDoctors');

  }

  public deleteUsers(id: any) {
    return this.http.delete(this.API + '/deletePatient?id=' + id);
  }

  public updateUsers(user: any) {
    return this.http.put(this.API + '/updateUser', user);
  }
  signup(request: Request): Observable<any> {
		return this.http.post<any>(this.API + '/signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}
}