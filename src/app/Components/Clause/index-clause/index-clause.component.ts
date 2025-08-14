import { Component, OnInit } from '@angular/core';
import { Clause } from '../../../Models/clause';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClauseService } from '../../../Services/Clause-Service/clause-service.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-index-clause',
  standalone: true,
   imports: [CommonModule, NgxPaginationModule],
  templateUrl: './index-clause.component.html',
  styleUrls: ['./index-clause.component.css']
})
export class IndexClauseComponent implements OnInit {

  clauses: Clause[] = [];
  isLoading: boolean = true;

  constructor(
    private clauseService: ClauseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClauses();
  }

  loadClauses(): void {
    this.clauseService.getClauses().subscribe({
      next: (data) => {
        console.log(data);
        this.clauses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load clauses', 'Error');
        this.isLoading = false;
      }
    });
  }

  deleteClause(id: number): void {
    if (!confirm('Are you sure you want to delete this clause?')) return;

    this.clauseService.deleteClause(id).subscribe({
      next: () => {
        this.toastr.success('Clause deleted successfully', 'Success');
        this.loadClauses();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to delete clause', 'Error');
      }
    });
  }

  addCompliance(): void {
      this.router.navigate(['/add-clause']);
    }

  editClause(id: number): void {
    this.router.navigate(['/edit-clause', id]);
  }

  viewClause(id: number): void {
    this.router.navigate(['/view-clause', id]);
  }

}
