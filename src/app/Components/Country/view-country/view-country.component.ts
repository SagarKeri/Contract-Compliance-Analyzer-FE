import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../Services/Country-Service/country-service.service';
import { Country } from '../../../Models/country';

@Component({
  selector: 'app-view-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.css']
})
export class ViewCountryComponent implements OnInit {
  country?: Country;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.countryService.getCountryById(id).subscribe({
        next: (data) => {
          this.country = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching country:', err);
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/country']);
  }
}
