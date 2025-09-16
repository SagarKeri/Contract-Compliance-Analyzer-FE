import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastAnalysisServiceService {

    private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUserAnalysis(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/users/${userId}/analysis`);
  }
}
