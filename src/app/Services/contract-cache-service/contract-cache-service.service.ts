import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractCache } from '../../Models/contract-cache-response';

@Injectable({
  providedIn: 'root',
})
export class ContractCacheServiceService {
  private baseUrl = 'http://127.0.0.1:8080'; // Remove /contracts-cache

  constructor(private http: HttpClient) {}

  getContractById(id: string): Observable<ContractCache> {
    return this.http.get<ContractCache>(`${this.baseUrl}/contracts-cache/${id}`);
  }

  downloadContract(cacheId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/download-contract/${cacheId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  downloadReportContract(cacheId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/download-excel?_id=${cacheId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
