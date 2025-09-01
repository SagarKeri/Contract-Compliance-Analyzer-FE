import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { RouterLink } from "@angular/router";
=======
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
>>>>>>> Stashed changes

@Component({
  selector: 'app-admin-persona',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterLink],
=======
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
>>>>>>> Stashed changes
  templateUrl: './admin-persona.component.html',
  styleUrl: './admin-persona.component.css'
})
export class AdminPersonaComponent {

}
