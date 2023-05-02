import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';

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
