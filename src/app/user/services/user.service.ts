import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';

export class UserService {
constructor(private http: HttpClient) {}

login(email: string, password: string) {
  const user: User= { _id: null, email: email, password: password }
  this.http.post('http://localhost/login', user)
  .subscribe(() => {
    console.log('success');
  });
}

register(email: string, password: string) {
  const user: User= { _id: null, email: email, password: password }
  this.http.post('http://localhost/signup', user)
  .subscribe(() => {
    console.log('hello win');
  });
}

}

