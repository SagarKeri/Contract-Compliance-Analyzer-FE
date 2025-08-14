import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
import { AnalyzeContractComponent } from "../analyze-contract/analyze-contract.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,AnalyzeContractComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
