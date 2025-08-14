import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComplianceService } from '../../../Services/Compliance-Service/compliance-service.service';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { Domain } from '../../../Models/domain';
import { Compliance } from '../../../Models/compliance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-compliance.component.html',
  styleUrls: ['./create-compliance.component.css']
})
export class CreateComplianceComponent implements OnInit {

  complianceName: string = '';
  selectedDomainId: number | null = null;
  domains: Domain[] = [];
  isSubmitting: boolean = false;

  constructor(
    private complianceService: ComplianceService,
    private domainService: DomainService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDomains();
  }

  loadDomains(): void {
    this.domainService.getDomains().subscribe({
      next: (data) => this.domains = data,
      error: (err) => console.error('Error loading domains:', err)
    });
  }

  addCompliance(): void {
    if (!this.complianceName.trim() || !this.selectedDomainId) return;

    this.isSubmitting = true;

    const compliance: Compliance = {
      compliance_name: this.complianceName.trim(),
      domain_id: this.selectedDomainId
    };

    this.complianceService.createCompliance(compliance).subscribe({
      next: () => {
        this.toastr.success('Compliance added successfully', 'Success');
        this.router.navigate(['/compliance']);
      },
      error: (err) => {
        console.error('Error adding compliance:', err);
        this.toastr.error('Failed to add compliance', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/compliance']);
  }
}
