import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compliance } from '../../../Models/compliance';
import { ComplianceService } from '../../../Services/Compliance-Service/compliance-service.service';

@Component({
  selector: 'app-index-compliance',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './index-compliance.component.html',
  styleUrls: ['./index-compliance.component.css']
})
export class IndexComplianceComponent implements OnInit {
  compliances: Compliance[] = [];
  page: number = 1; // current page
  itemsPerPage: number = 5; // rows per page

  constructor(
    private complianceService: ComplianceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCompliances();
  }

  loadCompliances(): void {
    this.complianceService.getCompliances().subscribe({
      next: (data) => {
        this.compliances = data;
        console.log('Compliances:', data);
      },
      error: (err) => console.error('Error loading compliances:', err)
    });
  }

  addCompliance(): void {
    this.router.navigate(['/add-compliance']); // navigate to add-compliance page
  }

  viewCompliance(compliance: Compliance): void {
    this.router.navigate(['/view-compliance', compliance._id]);
  }

  editCompliance(compliance: Compliance): void {
    this.router.navigate(['/edit-compliance', compliance._id]);
  }

  deleteCompliance(compliance: Compliance): void {
    this.complianceService.deleteCompliance(compliance._id || 0).subscribe({
      next: () => {
        this.loadCompliances();
        this.toastr.success('Compliance deleted successfully', 'Success');
      },
      error: (err) => {
        console.error('Error deleting compliance:', err);
        this.toastr.error('Failed to delete compliance', 'Error');
      }
    });
  }
}
