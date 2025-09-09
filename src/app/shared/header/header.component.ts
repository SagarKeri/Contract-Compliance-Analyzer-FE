import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthServiceService, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  get isAdmin(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role_id === 1 : false;
  }

  get userName(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      return `${parsed.first_name} ${parsed.last_name}`;
    }
    return '';
  }

  confirmLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

   goToAnalyze() {
    this.router.navigate(['my-analysis'], { queryParams: {} });
  }
}
