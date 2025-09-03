import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
import { AnalyzeContractComponent } from "../analyze-contract/analyze-contract.component";
import { ContractGenieComponent } from "../Contract-Genie/contract-genie/contract-genie.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, AnalyzeContractComponent, RouterOutlet, ContractGenieComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {

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
}
