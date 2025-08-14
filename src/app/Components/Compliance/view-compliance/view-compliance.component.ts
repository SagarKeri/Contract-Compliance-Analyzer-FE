import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplianceService } from '../../../Services/Compliance-Service/compliance-service.service';
import { Compliance } from '../../../Models/compliance';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-compliance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-compliance.component.html',
  styleUrls: ['./view-compliance.component.css']
})
export class ViewComplianceComponent implements OnInit {

  complianceId: number = 0;
  compliance: Compliance | null = null;
  domainName: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private complianceService: ComplianceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.complianceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCompliance();
  }

  loadCompliance(): void {
    this.complianceService.getComplianceById(this.complianceId).subscribe({
      next: (data) => {
        this.compliance = data[0];
        this.domainName = (data[0] as any).domain_name || '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading compliance:', err);
        this.toastr.error('Failed to load compliance', 'Error');
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compliance']);
  }
}
