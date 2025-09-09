import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from '../../Models/loginResponse';
import { UserCreate } from '../../Models/userCreate';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8080'; // Adjust if your backend URL is different

  constructor(private http: HttpClient) {}

  signup(user: UserCreate): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/signup`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<TokenResponse> {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
        }
      }),
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error.detail || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
