import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../Models/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'http://127.0.0.1:8080/countries';

  constructor(private http: HttpClient) { }

  createCountry(country: Country): Observable<any> {
    return this.http.post<any>(this.apiUrl, country);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  updateCountry(id: number, country: Country): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, country);
  }

  deleteCountry(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
