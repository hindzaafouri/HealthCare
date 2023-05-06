import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }


  getData(){
    return this.http.get("http://localhost:8080/healthcare/patients/Allnumber")
  }
  addPatient(patient:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post("http://localhost:8080/healthcare/patients/add",patient,httpOptions)
  }

  upPatient(patient:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put("http://localhost:8080/healthcare/patients/update",patient,httpOptions)
  }

  getPatient()
  {
    return this.http.get("http://localhost:8080/healthcare/patients/all")
  }

  delete(id:any)
  {
    return this.http.delete("http://localhost:8080/healthcare/patients/delete/"+id)
  }

  getId(id:any){
    return this.http.get("http://localhost:8080/healthcare/patients/"+id)
  }


  getAllNumber()
  {
    return this.http.get("http://localhost:8080/healthcare/patients/Allnumber")
  }
}
