import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compliance } from '../../Models/compliance';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {

  private apiUrl = 'http://127.0.0.1:8080/compliances'; // Adjust endpoint as needed

  constructor(private http: HttpClient) { }

  createCompliance(compliance: Compliance): Observable<any> {
    return this.http.post<any>(this.apiUrl, compliance);
  }

  getCompliances(): Observable<Compliance[]> {
    return this.http.get<Compliance[]>(this.apiUrl);
  }

  getComplianceById(id: number): Observable<Compliance[]> {
    return this.http.get<Compliance[]>(`${this.apiUrl}/${id}`);
  }

  updateCompliance(id: number, compliance: Compliance): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, compliance);
  }

  deleteCompliance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
