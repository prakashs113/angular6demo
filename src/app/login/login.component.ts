import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenobj;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  isAuthenticated: boolean;
  rev_orgid: Number = 103;
  room_key: Number = 100;

  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  loginForm: FormGroup; constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

    this.loginForm = fb.group({
      userName: ['', Validators.required],
      tenantID: ['', Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  loginFn(userName, passWord) {
    if (!userName) {
      alert("Enter User Name");
    }
    else if (!passWord) {
      alert("Enter Password");
    }
    else {
      this.loginService
        .login(userName, passWord)
        .subscribe((data: any[]) => {
          // this.tokenobj = data;
          // if (data.length > 0) {
          //   if (data[0].type == 'doctor') {
              this.router.navigate(['AdminDash', { outlets: { Adminout: ['welcomePageView'] } }]);
          //   }
          //   else if (data[0].type == 'office') {
          //     this.router.navigate(['/officeDash', { outlets: { office: ['officeDashboard'] } }]);
          //   }
          // } else {
            // alert("Invalid login credentials");
            // return;
          // }
        });
    }
  }
  ngOnInit() {
  }

}
