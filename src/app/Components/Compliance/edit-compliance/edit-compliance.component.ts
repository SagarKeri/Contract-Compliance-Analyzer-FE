import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplianceService } from '../../../Services/Compliance-Service/compliance-service.service';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { Domain } from '../../../Models/domain';
import { Compliance } from '../../../Models/compliance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-compliance.component.html',
  styleUrls: ['./edit-compliance.component.css']
})
export class EditComplianceComponent implements OnInit {

  complianceId: number = 0;
  complianceName: string = '';
  selectedDomainId: number | null = null;
  domains: Domain[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private complianceService: ComplianceService,
    private domainService: DomainService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.complianceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDomains();
    this.loadCompliance();
  }

  loadDomains(): void {
    this.domainService.getDomains().subscribe({
      next: (data) => this.domains = data,
      error: (err) => console.error('Error loading domains:', err)
    });
  }

  loadCompliance(): void {
    this.complianceService.getComplianceById(this.complianceId).subscribe({
      next: (data) => {
        this.complianceName = data[0].compliance_name;
        this.selectedDomainId = data[0].domain_id;
        this.isLoading = false;
        console.log(this.complianceName);
        console.log(this.selectedDomainId);

      },
      error: (err) => {
        console.error('Error loading compliance:', err);
        this.toastr.error('Failed to load compliance', 'Error');
        this.isLoading = false;
      }
    });
  }

  updateCompliance(): void {
    if (!this.complianceName.trim() || !this.selectedDomainId) return;

    this.isSubmitting = true;

    const compliance: Compliance = {
      compliance_name: this.complianceName.trim(),
      domain_id: this.selectedDomainId
    };

    this.complianceService.updateCompliance(this.complianceId, compliance).subscribe({
      next: () => {
        this.toastr.success('Compliance updated successfully', 'Success');
        this.router.navigate(['/compliance']);
      },
      error: (err) => {
        console.error('Error updating compliance:', err);
        this.toastr.error('Failed to update compliance', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compliance']);
  }
}
