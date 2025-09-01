import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { Country } from '../../../Models/country';
import { Domain } from '../../../Models/domain';

@Component({
  selector: 'app-edit-domain',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-domain.component.html',
  styleUrls: ['./edit-domain.component.css']
})
export class EditDomainComponent implements OnInit {
  domainName: string = '';
  countries: Country[] = [];
  selectedCountryId: number | null = null;
  domainId: number = 0;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private domainService: DomainService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    // Get domain ID from route
    this.domainId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.domainId) {
      this.toastr.error('Invalid domain ID', 'Error');
      this.router.navigate(['admin/domain']);
      return;
    }

    this.loadCountries();
    this.loadDomain();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error('Error loading countries:', err)
    });
  }

  loadDomain(): void {
    this.domainService.getDomainById(this.domainId).subscribe({
      next: (data) => {
        this.domainName = data.domain_name;
        this.selectedCountryId = data.country_id;
      },
      error: (err) => {
        console.error('Error loading domain:', err);
        this.toastr.error('Failed to load domain', 'Error');
        this.router.navigate(['admin/domain']);
      }
    });
  }

  updateDomain(): void {
    if (!this.domainName.trim() || !this.selectedCountryId) return;

    this.isSubmitting = true;
    const updatedDomain: Domain = {
      domain_name: this.domainName,
      country_id: this.selectedCountryId
    };

    this.domainService.updateDomain(this.domainId, updatedDomain).subscribe({
      next: () => {
        this.toastr.success('Domain updated successfully', 'Success');
        this.router.navigate(['admin/domain']);
      },
      error: (err) => {
        console.error('Error updating domain:', err);
        this.toastr.error('Failed to update domain', 'Error');
      },
      complete: () => (this.isSubmitting = false)
    });
  }

  goBack(): void {
    this.router.navigate(['admin/domain']);
  }
}
