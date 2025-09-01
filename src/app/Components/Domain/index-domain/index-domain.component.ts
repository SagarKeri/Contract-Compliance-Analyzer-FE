import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Domain } from '../../../Models/domain';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';

@Component({
  selector: 'app-index-domain',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './index-domain.component.html',
  styleUrls: ['./index-domain.component.css'],
})
export class IndexDomainComponent implements OnInit {
  domains: Domain[] = [];
  page: number = 1; // current page
  itemsPerPage: number = 5; // rows per page

  constructor(
    private domainService: DomainService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDomains();
  }

  loadDomains(): void {
    this.domainService.getDomains().subscribe({
      next: (data) => {
        this.domains = data;
        console.log(data);
      },
      error: (err) => console.error('Error loading domains:', err),
    });
  }

  addDomain(): void {
    this.router.navigate(['admin/add-domain']); // navigate to add-domain page
  }

  viewDomain(domain: Domain): void {
    this.router.navigate(['admin/view-domain', domain._id]);
  }

  editDomain(domain: Domain): void {
    this.router.navigate(['admin/edit-domain', domain._id]);
  }

  deleteDomain(domain: Domain): void {
    this.domainService.deleteDomain(domain._id || 0).subscribe({
      next: () => {
        this.loadDomains();
        this.toastr.success('Domain deleted successfully', 'Success');
      },
      error: (err) => {
        console.error('Error deleting domain:', err);
        this.toastr.error('Failed to delete domain', 'Error');
      },
    });
  }
}
