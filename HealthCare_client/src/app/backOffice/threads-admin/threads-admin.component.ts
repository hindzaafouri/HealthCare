import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { AnswerAdminComponent } from '../answer-admin/answer-admin.component';
import { threadId } from 'worker_threads';
import { ThreadService } from 'src/app/services-hind/thread.service';
import { ChartScales,Chart,ChartConfiguration,ChartOptions,ChartData } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-threads-admin',
  templateUrl: './threads-admin.component.html',
  styleUrls: ['./threads-admin.component.css']
})

export class ThreadsAdminComponent implements OnInit {

  threads: any[] = [];
  thread!:Thread ;
  isModalOpen = false;
  chart!: Chart;
  year: number = new Date().getFullYear();
  currentPage = 1;
  itemsPerPage = 5;



  constructor(private http: HttpClient , private router: Router,private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getThreads() ; 
    this.createChart(new Date().getFullYear());
  }
  

  // from service
  getThreads(): void {
    this.threadService.getThreads().subscribe(data => {
      this.threads = data;
      console.log(this.threads);
    }, error => {
      console.log(error);
    });
  }

  // from service 
  getThreadById(threadId: number) : void {
    this.threadService.getThreadById(threadId).subscribe(
      data => {
        console.log(data);
        this.thread = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  createChart(year: number): void {
    this.threadService.getThreadCountsByMonthInYear(year).subscribe((monthCounts) => {
      const chartData = {
        labels: monthCounts.map(monthCount => monthCount.month),
        datasets: [
          {
            label: `Number of Threads in ${year}`,
            data: monthCounts.map(monthCount => monthCount.count),
            backgroundColor: '#0694a2',
            borderColor: '#0694a2',
            fill: false
          }
        ]
      };

      const chartConfig: ChartConfiguration = {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
      if (this.chart) {
        this.chart.destroy();
      }

      const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
      this.chart = new Chart(canvas, chartConfig);
    });
  }
  
  /*line(timeFrame: string = 'day'): void {
    let labelFormat: string;
    let queryParam: string;

    switch (timeFrame) {
      case 'day':
        labelFormat = 'yyyy-MM-dd';
        queryParam = 'day';
        break;
      case 'month':
        labelFormat = 'yyyy-MM';
        queryParam = 'month';
        break;
      case 'year':
        labelFormat = 'yyyy';
        queryParam = 'year';
        break;
      default:
        throw new Error('Invalid time frame');
    }

    this.threadService.getThreadsByTimeFrame(queryParam).subscribe((data) => {
      const countByTimeFrame: CountByTimeFrame = {};

      data.forEach((thread) => {
        const date = new Date(thread.createdAt);

        if (timeFrame === 'day') {
          const day = date.toLocaleDateString();
          if (countByTimeFrame[day]) {
            countByTimeFrame[day] += 1;
          } else {
            countByTimeFrame[day] = 1;
          }
        } else if (timeFrame === 'month') {
          const month = date.toLocaleString('default', { month: 'long' });
          if (countByTimeFrame[month]) {
            countByTimeFrame[month] += 1;
          } else {
            countByTimeFrame[month] = 1;
          }
        } else if (timeFrame === 'year') {
          const year = date.getFullYear();
          if (countByTimeFrame[year]) {
            countByTimeFrame[year] += 1;
          } else {
            countByTimeFrame[year] = 1;
          }
        }
      });

      const labels = Object.keys(countByTimeFrame);
      const datasets = [
        {
          label: 'Threads',
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: Object.values(countByTimeFrame),
          fill: false,
        },
      ];

      const lineCtx = document.getElementById('line') as HTMLCanvasElement;
      const lineConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
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
                labelString: timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1),
              },
              ticks: {
                callback: (value: string) => new Date(value).toLocaleDateString('en-US', { [labelFormat]: labelFormat }),
              },
            },
            y: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of Threads',
              },
            },
          } as ChartScales,
        },
      };

      this.lineChart = new Chart(lineCtx, lineConfig);
    });
  }*/

  onEditButtonClick(threadId: number) {
    this.router.navigate(['/update-thread', threadId]);
  }

}


interface CountByTimeFrame {
  [key: string]: number;
}