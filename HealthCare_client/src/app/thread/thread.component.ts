import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  topics: string[] = [];

  constructor(private http: HttpClient) { }

  getTopics() : void {
    this.http.get<string[]>('http://localhost:8080/healthcare/thread-op/topics').subscribe(data => {
      this.topics = data;
    });
  }

  ngOnInit(): void {
    this.getTopics() ;
  }

  

}
