import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastAnalysisServiceService {

  private apiUrl = 'http://localhost:8080/users'; // FastAPI base URL

  constructor(private http: HttpClient) {}

  getUserAnalysis(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/analysis`);
  }
}
