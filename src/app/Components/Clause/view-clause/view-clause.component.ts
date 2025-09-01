import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clause } from '../../../Models/clause';
import { ToastrService } from 'ngx-toastr';
import { ClauseService } from '../../../Services/Clause-Service/clause-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-clause',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './view-clause.component.html',
  styleUrls: ['./view-clause.component.css']
})
export class ViewClauseComponent implements OnInit {

  clause: Clause | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private clauseService: ClauseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clauseService.getClauseById(id).subscribe({
      next: (data) => {
        this.clause = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load clause', 'Error');
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['admin/clause']);
  }
}
