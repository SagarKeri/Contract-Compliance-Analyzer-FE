import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContractAnalysisResponse } from '../Models/contract-analysis-response.model';
import { ApiResponse } from '../Models/ApiResponse.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ContractAnalysisServiceService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  analyzeContract(
  file: File,
  clauses: number[],
  model:number,
  country:number,
  domain:number,
  userId:string
): Observable<ApiResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('clauses', JSON.stringify(clauses));
  formData.append('model', model.toString());
  formData.append('country_id', country.toString());
  formData.append('domain_id', domain.toString());
  formData.append('user_id', userId);

  return this.http
    .post<
      | ApiResponse
      | { error: string; raw_output: string; cache_key: string }
    >(`${this.apiBaseUrl}/analyze-contract`, formData)
    .pipe(
      map((response) => {
        if ('error' in response) {
          throw new Error(
            `Backend error: ${response.error}. Raw output: ${response.raw_output}`
          );
        }
        return response as ApiResponse;
      }),
      catchError(this.handleError)
    );
}


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while processing the request.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
      if (error.error?.detail) {
        errorMessage += ` Details: ${error.error.detail}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  submitFeedback(
    complianceArea: string,
    feedback: 'like' | 'dislike',
    cacheKey: string
  ): Observable<any> {
    const payload = {
      compliance_area: complianceArea,
      feedback: feedback,
      cache_key: cacheKey,
    };

    return this.http
      .post(`${this.apiBaseUrl}/feedback`, payload)
      .pipe(catchError(this.handleError));
  }

  // uploadPdfCopy(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(this.saveCopyApiUrl, formData).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // downloadPdf(): Observable<Blob> {
  //   return this.http.get(this.downloadApiUrl, { responseType: 'blob' }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
}
