import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnalyzeContractComponent } from "../analyze-contract/analyze-contract.component";
import { ContractGenieComponent } from "../Contract-Genie/contract-genie/contract-genie.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthServiceService } from '../../Services/auth-service/auth-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, AnalyzeContractComponent, RouterOutlet, ContractGenieComponent, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {
goToAnalyze() {
this.router.navigateByUrl('/my-analysis');
}

  isCollapsed = false;
  isAdminActive = false;

   constructor(private router: Router,private authService:AuthServiceService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAdminActive = this.router.url.startsWith('/country')
          || this.router.url.startsWith('/domain')
          || this.router.url.startsWith('/clause')
          || this.router.url.startsWith('/user');
      });
  }

  ngAfterViewInit() {
    const genieButton = document.getElementById('genieButton');
    const genieWindow = document.getElementById('genieWindow');

    if (genieWindow && genieButton) {
      genieWindow.addEventListener('shown.bs.collapse', () => {
        genieButton.classList.remove('animate');
      });

      genieWindow.addEventListener('hidden.bs.collapse', () => {
        genieButton.classList.add('animate');
      });
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  confirmLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  get isAdmin(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role_id === 1 : false;
  }
}
