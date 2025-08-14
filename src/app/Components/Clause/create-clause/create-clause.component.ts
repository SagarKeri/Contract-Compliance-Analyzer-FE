import { Component, OnInit } from '@angular/core';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { Domain } from '../../../Models/domain';
import { Clause } from '../../../Models/clause';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClauseService } from '../../../Services/Clause-Service/clause-service.service';

@Component({
  selector: 'app-create-clause',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-clause.component.html',
  styleUrls: ['./create-clause.component.css']
})
export class CreateClauseComponent implements OnInit {

  clauseName: string = '';
  clauseText: string = '';
  selectedDomainId: number | null = null;
  domains: Domain[] = [];
  isSubmitting: boolean = false;

  constructor(
    private clauseService: ClauseService,
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

  addClause(): void {
    if (!this.clauseName.trim() || !this.clauseText.trim() || !this.selectedDomainId) return;

    this.isSubmitting = true;

    const clause: Clause = {
      clause_name: this.clauseName.trim(),
      clause_text: this.clauseText.trim(),
      domain_id: this.selectedDomainId
    };

    this.clauseService.createClause(clause).subscribe({
      next: () => {
        this.toastr.success('Clause added successfully', 'Success');
        this.router.navigate(['/clause']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to add clause', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clause']);
  }

}
