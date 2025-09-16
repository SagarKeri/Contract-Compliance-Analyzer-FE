import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clause } from '../../Models/clause';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClauseService {

    private readonly apiBaseUrl = `${environment.apiBaseUrl}/clauses`;
  

  constructor(private http: HttpClient) { }

  // Create Clause
  createClause(clause: Clause): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl, clause);
  }

  // Get all Clauses
  getClauses(): Observable<Clause[]> {
    return this.http.get<Clause[]>(this.apiBaseUrl);
  }

  // Get Clause by ID
  getClauseById(id: number): Observable<Clause> {
    return this.http.get<Clause>(`${this.apiBaseUrl}/${id}`);
  }

  // Update Clause
  updateClause(id: number, clause: Clause): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, clause);
  }

  // Delete Clause
  deleteClause(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/${id}`);
  }

  // Get Clauses by Domain
  getClausesByDomain(domainId: number): Observable<Clause[]> {
    return this.http.get<Clause[]>(`${this.apiBaseUrl}/${domainId}`);
  }

  getClausesByCountryDomain(countryId: number, domainId: number): Observable<Clause[]> {
    const params = new HttpParams()
      .set('country_id', countryId.toString())
      .set('domain_id', domainId.toString());
    return this.http.get<Clause[]>(`${this.apiBaseUrl}/filter`, { params });
}
}
