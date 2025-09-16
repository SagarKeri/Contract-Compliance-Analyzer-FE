import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from '../../Models/domain';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private readonly apiBaseUrl = environment.apiBaseUrl;
  

  constructor(private http: HttpClient) { }

  // Create a new domain
  createDomain(domain: Domain): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/domains`, domain);
  }

  // Get all domains
  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiBaseUrl}/domains`);
  }

  // Get domains by country ID
  getDomainsByCountry(countryId: number): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiBaseUrl}/domains/bycountry/${countryId}`);
  }

  // Get a single domain by ID
  getDomainById(id: number): Observable<Domain> {
    return this.http.get<Domain>(`${this.apiBaseUrl}/domains/byid/${id}`);
  }

  // Update an existing domain
  updateDomain(id: number, domain: Domain): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/domains/${id}`, domain);
  }

  // Delete a domain
  deleteDomain(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/domains/${id}`);
  }
}
