import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userIsAuthenticated: boolean;
  error: string;
  token: string;
  private authListenerSubs: Subscription;

  constructor(public userService: UserService, private router: Router) {}


  public onSubmit(login){
    let email = login.form.value.email;
    let password = login.form.value.password;
    this.userService.login(email, password)
    .subscribe(token => {
      this.token = token.token;
      this.router.navigate(['home']);
    }, httpError => {
      this.error = httpError.error;
    });


  }


}



