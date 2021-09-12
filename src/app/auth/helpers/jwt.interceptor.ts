import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { retry, tap } from 'rxjs/operators';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public returnUrl: string;
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService,private toastService:ToastService,private router: Router) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn != null) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      return next.handle(cloned);

    }
    else{
      return next.handle(request);
    }
  }
}
