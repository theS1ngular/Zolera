import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onSubmit(login){
    let email = login.form.value.email;
    let password = login.form.value.password;
    console.log(email);

  }
  }



