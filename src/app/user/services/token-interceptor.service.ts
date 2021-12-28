import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.userService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('auth-token', authToken)
    })
    return next.handle(authRequest);
  }
}
