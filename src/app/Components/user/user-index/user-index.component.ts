import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { UserServiceService } from '../../../Services/user-service/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from "ngx-pagination";
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, ConfirmDialogComponent],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent {
  users: User[] = [];
  page: number = 1; // current page
  itemsPerPage: number = 5; // rows per page

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data.users

      ),
      error: (err) => console.error('Error loading countries:', err),
    });
  }

  // toggleRole(user: any) {
  //   const newRoleId = user.role_id === 1 ? 2 : 1; // toggle
  //   this.userService.updateUserRole(user._id, newRoleId).subscribe({
  //     next: () => {
  //       user.role_id = newRoleId; // update UI immediately
  //     },
  //     error: (err) => {
  //       console.error('Failed to update role', err);
  //     }
  //   });
  // }

  toggleRole(user: any) {
  const newRoleId = user.role_id === 1 ? 2 : 1; // toggle
  this.userService.updateUserRole(user._id, newRoleId).subscribe({
    next: () => {
      this.toastr.success('Role updated successfully', 'Success');
      this.loadCountries(); // refresh the list from backend
    },
    error: (err) => {
      console.error('Failed to update role', err);
      this.toastr.error('Failed to update role', 'Error');
    }
  });
}

showConfirmDialog = false;
selectedUserId: string | null = null;

openDeleteDialog(userId: string) {
  this.selectedUserId = userId;
  this.showConfirmDialog = true;
}

closeDialog() {
  this.showConfirmDialog = false;
  this.selectedUserId = null;
}

deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        this.userService.deleteUser(userId);
        this.loadCountries()
      },
      error: (err) => {
        console.error('Delete failed:', err);
      }
    });
}


  // addCountry(): void {
  //   this.router.navigate(['add-country']); // navigate to add-country page
  // }

  // viewCountry(country: Country): void {
  //   this.router.navigate(['view-country', country._id]);
  // }

  // editCountry(country: Country): void {
  //   this.router.navigate(['edit-country', country._id]);
  // }

  // deleteCountry(country: Country): void {
  //     this.countryService.deleteCountry(country._id || 0).subscribe({
  //       next: () => {
  //         this.loadCountries();
  //         this.toastr.success('Country deleted successfully', 'Success');
  //       },
  //       error: (err) => {
  //         console.error('Error deleting country:', err);
  //         this.toastr.error('Failed to delete country', 'Error');
  //       },
  //     });
  //   }
}
