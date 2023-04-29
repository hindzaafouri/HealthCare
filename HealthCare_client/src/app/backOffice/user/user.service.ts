import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Request } from './SignUpRequest';

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