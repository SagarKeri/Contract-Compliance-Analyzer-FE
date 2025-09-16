import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Helper to include token in requests
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/users`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update user role
  updateUserRole(userId: string, roleId: number): Observable<any> {
    return this.http.put(
      `${this.apiBaseUrl}/users/update-role`,
      { user_id: userId, role_id: roleId },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/users/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
