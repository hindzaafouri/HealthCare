import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ChartScales,Chart,ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-patientfile-admin',
  templateUrl: './patientfile-admin.component.html',
  styleUrls: ['./patientfile-admin.component.css']
})
export class PatientfileAdminComponent implements OnInit {

  username=""
  consutation_nbr=""
  content=""
  state=""
  search=""
upbtn!:boolean
  AllPatient:any=[]
  detPAth:any=[]
  id!:Number
  data:any=[]
  private pieChart!: Chart;
  private lineChart!: Chart ;

  dataNum:any=[]
  constructor(private sr:PatientService) { }

  getData()
  {
    this.sr.getData().subscribe(res=>{
      this.data=res
      this.pie(this.data.malade,this.data.gueri)
      
    })
  }
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
    this.getData();
    this.line();
  }

  
  pie(malade:any,gueri:any) {
    const pieCtx = document.getElementById('piex') as HTMLCanvasElement;
    const pieConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [malade,gueri],
            backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
            label: 'Dataset 1',
          },
        ],
        labels: ['Malade', 'Gueri'],
      },
      options: {
        responsive: true,
        cutoutPercentage: 80,
        legend: {
          display: false,
        },
      },
    };
    this.pieChart = new Chart(pieCtx, pieConfig);
  }

  line() {
    const lineCtx = document.getElementById('line') as HTMLCanvasElement;
    const lineConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Organic',
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: '#0694a2',
            borderColor: '#0694a2',
            data: [43, 48, 40, 54, 67, 73, 70],
            fill: false,
          },
          {
            label: 'Paid',
            fill: false,
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: '#7e3af2',
            borderColor: '#7e3af2',
            data: [24, 50, 64, 74, 52, 51, 65],
          },
        ],
      },
      options: {
        responsive: true,
        /**
         * Default legends are ugly and impossible to style.
         * See examples in charts.html to add your own legends
         *  */
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
          },
        } as ChartScales,
      },
    };

    this.lineChart = new Chart(lineCtx, lineConfig);

  }

}
