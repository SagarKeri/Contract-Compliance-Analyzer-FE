import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../Models/country';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

    private readonly apiBaseUrl = `${environment.apiBaseUrl}/countries`;

  constructor(private http: HttpClient) { }

  createCountry(country: Country): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl, country);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiBaseUrl);
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiBaseUrl}/${id}`);
  }

  updateCountry(id: number, country: Country): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, country);
  }

  deleteCountry(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/${id}`);
  }
}
