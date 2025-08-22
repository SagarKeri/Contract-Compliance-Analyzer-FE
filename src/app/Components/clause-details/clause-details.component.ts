import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clause } from '../../Models/clause';
import { ClauseService } from '../../Services/Clause-Service/clause-service.service';

@Component({
  selector: 'app-clause-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clause-details.component.html',
  styleUrls: ['./clause-details.component.css']
})
export class ClauseDetailsComponent implements OnChanges {
  @Input() clauseId!: number;
  clause?: Clause;

  constructor(private clauseService: ClauseService) {}

  ngOnChanges() {
    if (this.clauseId) {
      this.loadClause();
    }
  }

  loadClause() {
    this.clauseService.getClauseById(this.clauseId).subscribe({
      next: (res) => {
        this.clause = res;
      },
      error: (err) => {
        console.error('Error fetching clause:', err);
      }
    });
  }

  closeModal() {
    const modalElement = document.getElementById('clauseModal');
    if (modalElement) {
      // Use Bootstrap's modal API to hide the modal
      const bootstrapModal = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
      bootstrapModal.hide();
    }
  }
}