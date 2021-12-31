import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  public error: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const user: User = { _id: null, email: email, password: password };
    return this.http.post<{token: string, error: string}>('http://localhost/api/login', user)
    .pipe(catchError(this.errorHandler));
  }

  register(email: string, password: string) {
  const user: User = { _id: null, email: email, password: password };
  return this.http.post<{user: object, error: string}>('http://localhost/api/signup', user)
  .pipe(catchError(this.errorHandler));
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  errorHandler(err){
    return throwError(err || 'server error');

  }

}

