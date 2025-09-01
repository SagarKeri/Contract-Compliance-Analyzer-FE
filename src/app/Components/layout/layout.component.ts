import { Component } from '@angular/core';
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
export class LayoutComponent {

}
