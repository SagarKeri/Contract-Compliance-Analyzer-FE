import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractCache } from '../../Models/contract-cache-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractCacheServiceService {
  private readonly apiBaseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getContractById(id: string): Observable<ContractCache> {
    return this.http.get<ContractCache>(
      `${this.apiBaseUrl}/contracts-cache/${id}`
    );
  }

  downloadContract(cacheId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiBaseUrl}/download-contract/${cacheId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  downloadReportContract(cacheId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiBaseUrl}/download-excel?_id=${cacheId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
