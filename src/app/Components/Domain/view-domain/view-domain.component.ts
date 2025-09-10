import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { Domain } from '../../../Models/domain';

@Component({
  selector: 'app-view-domain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-domain.component.html',
  styleUrls: ['./view-domain.component.css']
})
export class ViewDomainComponent implements OnInit {
  domain: Domain | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private domainService: DomainService
  ) {}

  ngOnInit(): void {
    const domainId = Number(this.route.snapshot.paramMap.get('id'));
    if (!domainId) {
      this.router.navigate(['domain']);
      return;
    }

    this.domainService.getDomainById(domainId).subscribe({
      next: (data) => {
        this.domain = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading domain:', err);
        this.isLoading = false;
        this.router.navigate(['domain']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['domain']);
  }
}
