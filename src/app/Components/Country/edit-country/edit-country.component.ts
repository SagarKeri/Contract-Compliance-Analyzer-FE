import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Country } from '../../../Models/country';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css'
})
export class EditCountryComponent implements OnInit {
  countryId!: number;
  countryName: string = '';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.countryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.countryId) {
      this.countryService.getCountryById(this.countryId).subscribe({
        next: (country: Country) => {
          this.countryName = country.country_name;
        },
        error: (err) => {
          console.error('Error fetching country', err);
          this.toastr.error('Failed to fetch country details', 'Error');
        }
      });
    }
  }

  updateCountry(): void {
    if (!this.countryName.trim()) return;

    this.isSubmitting = true;
    const updatedCountry: Country = { country_name: this.countryName };

    this.countryService.updateCountry(this.countryId, updatedCountry).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toastr.success('Country updated successfully!', 'Success');
        this.router.navigate(['admin/country']);
      },
      error: (err) => {
        console.error('Error updating country', err);
        this.toastr.error('Failed to update country', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/country']);
  }
}
