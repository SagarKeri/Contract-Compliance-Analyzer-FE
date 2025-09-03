import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-persona',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-persona.component.html',
  styleUrl: './admin-persona.component.css'
})
export class AdminPersonaComponent {
  constructor(private router: Router) {}

  isActive(keyword: string): boolean {
    return this.router.url.includes(keyword);
  }
}
