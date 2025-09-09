import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'http://localhost:8080'; 

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
    return this.http.get(`${this.apiUrl}/users`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update user role
  updateUserRole(userId: string, roleId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/update-role`,
      { user_id: userId, role_id: roleId },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
