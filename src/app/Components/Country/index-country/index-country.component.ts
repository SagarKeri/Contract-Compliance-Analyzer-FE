import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Country } from '../../../Models/country';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-country',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './index-country.component.html',
  styleUrls: ['./index-country.component.css'],
})
export class IndexCountryComponent implements OnInit {
  countries: Country[] = [];
  page: number = 1; // current page
  itemsPerPage: number = 5; // rows per page

  constructor(
    private countryService: CountryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => (this.countries = data),
      error: (err) => console.error('Error loading countries:', err),
    });
  }

  addCountry(): void {
    this.router.navigate(['/add-country']); // navigate to add-country page
  }

  viewCountry(country: Country): void {
    this.router.navigate(['/view-country', country._id]);
  }

  editCountry(country: Country): void {
    this.router.navigate(['/edit-country', country._id]);
  }

  deleteCountry(country: Country): void {
      this.countryService.deleteCountry(country._id || 0).subscribe({
        next: () => {
          this.loadCountries();
          this.toastr.success('Country deleted successfully', 'Success');
        },
        error: (err) => {
          console.error('Error deleting country:', err);
          this.toastr.error('Failed to delete country', 'Error');
        },
      });
    }
}
