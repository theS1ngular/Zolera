import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(public userService: UserService, private router: Router) {}
  error: String;
  user: Object;
  userAlreadyExist = false;

  onSubmit(register){
    let email = register.form.value.email;
    let password = register.form.value.password;
    this.userService.register(email, password)
    .subscribe(user =>{
      this.user = user;
      this.router.navigate(['home']);
    },error=>{
      this.error= error.error;
    });

  };

}


