import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { Country } from '../../../Models/country';
import { Domain } from '../../../Models/domain';

@Component({
  selector: 'app-create-domain',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-domain.component.html',
  styleUrls: ['./create-domain.component.css']
})
export class CreateDomainComponent implements OnInit {
  domainName: string = '';
  countries: Country[] = [];
  selectedCountryId: number | null = null;
  isSubmitting: boolean = false;

  constructor(
    private domainService: DomainService,
    private countryService: CountryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error('Error loading countries:', err)
    });
  }

  addDomain(): void {
    if (!this.domainName.trim() || !this.selectedCountryId) return;

    this.isSubmitting = true;
    const newDomain: Domain = {
      domain_name: this.domainName,
      country_id: this.selectedCountryId
    };

    this.domainService.createDomain(newDomain).subscribe({
      next: () => {
        this.toastr.success('Domain added successfully', 'Success');
        this.router.navigate(['/domain']);
      },
      error: (err) => {
        console.error('Error creating domain:', err);
        this.toastr.error('Failed to add domain', 'Error');
      },
      complete: () => this.isSubmitting = false
    });
  }

  goBack(): void {
    this.router.navigate(['/domain']);
  }
}
