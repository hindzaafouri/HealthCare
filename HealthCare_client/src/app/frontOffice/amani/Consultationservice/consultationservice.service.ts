import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultation } from 'src/models/Consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationserviceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/healthcare';

  deleteConsultation(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/Consultation/${id}`);
  }

  getConsultation(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/Consultation/${id}`);
  }
  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/listeConsultations`);
  }

  updateConsultation(id: number,consultation : Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.apiUrl}/update/${id}`,consultation);
  }


  addConsultation( consultation : Consultation,id:number): Observable<Consultation> {
    return this.http.post<Consultation>(`${this.apiUrl}/AddConsultation/${id}`, consultation);
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
}
