import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../../Models/country';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-country',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent {
  countryName: string = '';
  isSubmitting = false;

  constructor(
    private countryService: CountryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  addCountry(): void {
    if (!this.countryName.trim()) return;

    this.isSubmitting = true;
    const newCountry: Country = { country_name: this.countryName };

    this.countryService.createCountry(newCountry).subscribe({
      next: () => {
        this.toastr.success('Country added successfully!', 'Success');
        this.router.navigate(['admin/country']);
      },
      error: (err) => {
        console.error('Error adding country:', err);
        this.toastr.error('Failed to add country', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/country']);
  }
}
