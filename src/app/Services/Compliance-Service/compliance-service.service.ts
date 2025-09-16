import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compliance } from '../../Models/compliance';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplianceService {
  private readonly apiBaseUrl = `${environment.apiBaseUrl}/compliances`;

  constructor(private http: HttpClient) {}

  createCompliance(compliance: Compliance): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl, compliance);
  }

  getCompliances(): Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiBaseUrl);
  }

  getComplianceById(id: number): Observable<Compliance[]> {
    return this.http.get<Compliance[]>(`${this.apiBaseUrl}/${id}`);
  }

  updateCompliance(id: number, compliance: Compliance): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, compliance);
  }

  deleteCompliance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/${id}`);
  }
}
