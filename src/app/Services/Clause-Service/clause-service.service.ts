import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clause } from '../../Models/clause';

@Injectable({
  providedIn: 'root'
})
export class ClauseService {

  private apiUrl = 'http://127.0.0.1:8080/clauses';

  constructor(private http: HttpClient) { }

  // Create Clause
  createClause(clause: Clause): Observable<any> {
    return this.http.post<any>(this.apiUrl, clause);
  }

  // Get all Clauses
  getClauses(): Observable<Clause[]> {
    return this.http.get<Clause[]>(this.apiUrl);
  }

  // Get Clause by ID
  getClauseById(id: number): Observable<Clause> {
    return this.http.get<Clause>(`${this.apiUrl}/${id}`);
  }

  // Update Clause
  updateClause(id: number, clause: Clause): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, clause);
  }

  // Delete Clause
  deleteClause(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get Clauses by Domain
  getClausesByDomain(domainId: number): Observable<Clause[]> {
    return this.http.get<Clause[]>(`${this.apiUrl}/${domainId}`);
  }

  getClausesByCountryDomain(countryId: number, domainId: number): Observable<Clause[]> {
    const params = new HttpParams()
      .set('country_id', countryId.toString())
      .set('domain_id', domainId.toString());
    return this.http.get<Clause[]>(`${this.apiUrl}/filter`, { params });
}
}
