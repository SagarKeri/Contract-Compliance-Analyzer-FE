import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../../Services/Domain-Service/domain-service.service';
import { Clause } from '../../../Models/clause';
import { Domain } from '../../../Models/domain';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClauseService } from '../../../Services/Clause-Service/clause-service.service';

@Component({
  selector: 'app-edit-clause',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-clause.component.html',
  styleUrls: ['./edit-clause.component.css']
})
export class EditClauseComponent implements OnInit {

  clauseId: number = 0;
  clauseName: string = '';
  clauseText: string = '';
  selectedDomainId: number | null = null;
  domains: Domain[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clauseService: ClauseService,
    private domainService: DomainService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.clauseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDomains();
    this.loadClause();
  }

  loadDomains(): void {
    this.domainService.getDomains().subscribe({
      next: (data) => this.domains = data,
      error: (err) => console.error(err)
    });
  }

  loadClause(): void {
    this.clauseService.getClauseById(this.clauseId).subscribe({
      next: (data) => {
        this.clauseName = data[0]?.clause_name;
        this.clauseText = data[0]?.clause_text;
        this.selectedDomainId = data[0]?.domain_id;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load clause', 'Error');
        this.isLoading = false;
      }
    });
  }

  updateClause(): void {
    if (!this.clauseName.trim() || !this.clauseText.trim() || !this.selectedDomainId) return;

    this.isSubmitting = true;

    const clause: Clause = {
      clause_name: this.clauseName.trim(),
      clause_text: this.clauseText.trim(),
      domain_id: this.selectedDomainId
    };

    this.clauseService.updateClause(this.clauseId, clause).subscribe({
      next: () => {
        this.toastr.success('Clause updated successfully', 'Success');
        this.router.navigate(['/clause']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to update clause', 'Error');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clause']);
  }

}
