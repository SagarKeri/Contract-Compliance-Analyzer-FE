import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContractAnalysisResponse } from '../Models/contract-analysis-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContractAnalysisServiceService {
  private readonly uploadApiUrl = 'http://localhost:8080/analyze-contract';
  private readonly feedbackApiUrl = 'http://localhost:8080/feedback';
  private readonly saveCopyApiUrl = 'http://localhost:8080/save-copy';
  private readonly downloadApiUrl = 'http://localhost:8080/download-pdf';

  constructor(private http: HttpClient) {}

  analyzeContract(
  file: File,
  clauses: number[],
  model:number,
  country:number
): Observable<ContractAnalysisResponse[]> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('clauses', JSON.stringify(clauses));
  formData.append('model', model.toString());
  formData.append('country_id', country.toString());

  return this.http
    .post<
      | ContractAnalysisResponse[]
      | { error: string; raw_output: string; cache_key: string }
    >(this.uploadApiUrl, formData)
    .pipe(
      map((response) => {
        if ('error' in response) {
          throw new Error(
            `Backend error: ${response.error}. Raw output: ${response.raw_output}`
          );
        }
        return response as ContractAnalysisResponse[];
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
      .post(this.feedbackApiUrl, payload)
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
