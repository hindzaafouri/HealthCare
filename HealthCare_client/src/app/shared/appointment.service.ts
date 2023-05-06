import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/models/Appointment';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private getUrl: string = "http://localhost:8080/healthcare/api/appointments";

  constructor(private _httpClient: HttpClient) { }
  
  getAppointments(): Observable<Appointment[]> {
    return this._httpClient.get<Appointment[]>(this.getUrl+'/liste');
  }

  getUser(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.getUrl+'/users');
  }

  saveAppointment(appointment: Appointment): Observable<Appointment>{
    return this._httpClient.post<Appointment>(this.getUrl+'/liste', appointment);
  }

  getAppointment(id_appointment: number): Observable<Appointment>{
    return this._httpClient.get<Appointment>(this.getUrl+'/liste/'+id_appointment);
  }

  deleteAppointment(id_appointment: number): Observable<any> {
    return this._httpClient.delete(this.getUrl+'/liste/'+id_appointment ,  {responseType: 'text'});
  }

  updateAppointment(appointment: Appointment):Observable<Appointment>{
    return this._httpClient.put<Appointment>(this.getUrl+'/update/'+appointment.id_appointment, appointment);
  }
}
