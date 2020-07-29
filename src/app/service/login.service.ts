import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(userName, passWord) {
    const uri = 'http://localhost:3000/authenticate_SuType';
    const obj = {
      uname: userName,
      pwd: passWord
    };
    return this.http.post(uri, obj);
  }
}
