import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { User } from './user'
import { Router } from "@angular/router";

@Injectable()
export class AuthenticatorService {
  public token: string;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(
    private http: Http,
    private router:Router
  ) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(user: User): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify(user), {headers: this.headers})
      .map((response: Response) => {

        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token }));

          return true;
        } else {
          return false;
        }
      });
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    location.reload();
  }
}
