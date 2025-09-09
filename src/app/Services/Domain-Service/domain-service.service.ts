import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from '../../Models/domain';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private apiUrl = 'http://127.0.0.1:8080/domains';

  constructor(private http: HttpClient) { }

  // Create a new domain
  createDomain(domain: Domain): Observable<any> {
    return this.http.post<any>(this.apiUrl, domain);
  }

  // Get all domains
  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(this.apiUrl);
  }

  // Get domains by country ID
  getDomainsByCountry(countryId: number): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/bycountry/${countryId}`);
  }

  // Get a single domain by ID
  getDomainById(id: number): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiUrl}/byid/${id}`);
  }

  // Update an existing domain
  updateDomain(id: number, domain: Domain): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, domain);
  }

  // Delete a domain
  deleteDomain(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
