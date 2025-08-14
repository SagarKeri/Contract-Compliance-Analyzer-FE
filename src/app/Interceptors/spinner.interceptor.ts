import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../Services/Spinner-Service/spinner-service.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.show(); // show spinner before request

  return next(req).pipe(
    finalize(() => spinnerService.hide()) // hide spinner after response
  );
};
