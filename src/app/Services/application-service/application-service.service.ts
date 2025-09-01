import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  private fileSubject = new BehaviorSubject<File | null>(null);

  file$ = this.fileSubject.asObservable();

  constructor() {}

  setFile(file: File) {
    this.fileSubject.next(file);
  }

  clearFile() {
    this.fileSubject.next(null);
  }
}
