import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FichePatientService {


  constructor(private http:HttpClient) { }

  addPatient(patient:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post("http://localhost:8080/healthcare/patient/add",patient,httpOptions)
  }

  upPatient(patient:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put("http://localhost:8080/healthcare/patient/update",patient,httpOptions)
  }

  getPatient()
  {
    return this.http.get("http://localhost:8080/healthcare/patient/all")
  }

  delete(id:any)
  {
    return this.http.delete("http://localhost:8080/healthcare/patient/delete/"+id)
  }

  getId(id:any){
    return this.http.get("http://localhost:8080/healthcare/patient/"+id)
  }


  getAllNumber()
  {
    return this.http.get("http://localhost:8080/healthcare/patient/Allnumber")
  }
}