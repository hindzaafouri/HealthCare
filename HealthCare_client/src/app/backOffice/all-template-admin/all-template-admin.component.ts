import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartScales,Chart,ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-all-template-admin',
  templateUrl: './all-template-admin.component.html',
  styleUrls: ['./all-template-admin.component.css']
})
export class AllTemplateAdminComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private pieChart!: Chart;
  private lineChart!: Chart ;

  totalDoctors!: number;
  totalPatients!: number;
  totalUsers!: number;
  totalAdmins!: number;

  ngOnInit() {
   
    this.line();

    this.http.get(' http://localhost:8080/healthcare/users').subscribe((data: any) => {
       this.totalDoctors = data['totalDoctors'];
       this.totalPatients = data['totalPatients'];
       this.totalUsers = data['totalUsers'];
       this.totalAdmins = data['totalAdmins'];


      this.pie();
    });
    }

  pie() {
    const pieCtx = document.getElementById('pie') as HTMLCanvasElement;
    const pieConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [this.totalDoctors, this.totalPatients,this.totalAdmins],
            backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
            label: 'Users',
          },
        ],
        labels: ['Doctors', 'Patients','Admins'],
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
