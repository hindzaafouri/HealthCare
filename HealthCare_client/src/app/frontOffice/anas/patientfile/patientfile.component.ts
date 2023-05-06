import { Component, OnInit } from '@angular/core';
import { FichePatientService } from '../fiche-patient.service';

@Component({
  selector: 'app-patientfile',
  templateUrl: './patientfile.component.html',
  styleUrls: ['./patientfile.component.css']
})
export class PatientfileComponent implements OnInit {

  username=""
  consutation_nbr=""
  content=""
  state=""
  search=""
upbtn!:boolean
  AllPatient:any=[]
  detPAth:any=[]
  id!:Number

  dataNum:any=[]
  constructor(private sr:FichePatientService) { }


  ajoutPatient()
  {
    let data:any={
      "username":this.username,
      "consutation_nbr":this.consutation_nbr,
      "content":this.content,
      "state":this.state

    }
    this.sr.addPatient(data).subscribe(res=>{
      console.log(data)
       this.clear()

    })
  }

  clear()
  {
    this.username=""
    this.consutation_nbr=""
    this.content=""
    this.state=""
  }

  getAll(){
    this.sr.getPatient().subscribe(res=>{
      this.AllPatient=res
    })
  }

  delete(id:any)
  {
    this.sr.delete(id).subscribe(res=>{console.log(res)
    this.getAll()
    })
  }

  getId(id:any)
  {
    this.upbtn=true

    this.sr.getId(id).subscribe(res=>{
      this.detPAth=res
      console.log(res)
      this.id=this.detPAth.id_patientfile
      this.username=this.detPAth.username
      this.consutation_nbr=this.detPAth.consutation_nbr
      this.content=this.detPAth.content
      this.state=this.detPAth.state
    })
  }


  getAllNumb()
  {
    this.sr.getAllNumber().subscribe(res=>{
      this.dataNum=res
    })
  }
  update()
  {
    let data:any={
      "id_patientfile":this.id,
      "username":this.username,
      "consutation_nbr":this.consutation_nbr,
      "content":this.content,
      "state":this.state

    }
    this.sr.upPatient(data).subscribe(res=>{
      console.log(data)
      this.clear()

    })
  }
  ngOnInit(): void {
    this.getAll()
  }

}
