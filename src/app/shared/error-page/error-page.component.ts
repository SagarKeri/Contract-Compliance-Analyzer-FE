import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/auth-service/auth-service.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

  constructor(private authService: AuthServiceService) {}

  get isloggedin(): boolean {
    return this.authService.isLoggedIn();
  }

}
