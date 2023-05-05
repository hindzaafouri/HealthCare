import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  selectedFile!: File ;
  threadsSortedByVote: Thread[] = [];
  threads: Thread[] = [];
  topics: Topic[] = [];
  private apiUrl = 'http://localhost:8080/healthcare/thread-op';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

  }

  addThread(formData: FormData): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/add-thread`, formData);
  }

  getTopics (): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/topics`) ;
  }

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}`);
  }

  /*getThreadsByTimeFrame(timeFrame: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${timeFrame}`).pipe( 
      map((data) => {
        const countByTimeFrame: {[key: string]: number} = {}; // key can be day / month or year //value is number of threads
    
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
        const result = [];
        for (const [timeFrame, count] of Object.entries(countByTimeFrame)) {
          result.push({ timeFrame, count, createdAt: new Date(timeFrame) });
        }
        return result;
      })
    );
  }*/
  

  getThreadsSortedByVotes(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads-ByVotes`);
  }

  getThreadsByTopic(topic: Topic): Observable<Thread[]> {
    const topicString = topic.toString();
    return this.http.get<Thread[]>(`${this.apiUrl}/thread-byTopic/${topicString}`);
  }

  getThreadById(threadId: number): Observable<Thread> {
    const url = `${this.apiUrl}/${threadId}`;
    return this.http.get<Thread>(url);
  }

  updateThread(thread: Thread, isAdminUpdate: boolean = false): Observable<Thread> {
    const url = `${this.apiUrl}/update-thread/${thread.idThread}`;
    const data = {
      titleThread: thread.titleThread,
      questionThread: thread.questionThread,
      topicThread: thread.topicThread,
      status: isAdminUpdate ? thread.status : null,
    };
    return this.http.put<Thread>(url, data);
  }

  deleteThread(threadId: number) {
    return this.http.delete(`${this.apiUrl}/delete-thread/${threadId}`);
  }
}
