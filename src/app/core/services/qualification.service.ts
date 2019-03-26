import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, map } from 'rxjs/operators';

import { HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getQualifications() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.get<any>('/api/qualification', options).pipe(
      debounceTime(500),
      map(res => res.qualifications),
      catchError(this.httpErrorHandler.handleHttpError)
    );
  }
}
