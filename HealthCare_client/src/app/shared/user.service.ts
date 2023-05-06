import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUrl: string = "http://localhost:8080/healthcare/getDoctors";
  usersData !: User[];

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getDoctors(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.getUrl);
    console.log("Doctors :",User);
  }

}
