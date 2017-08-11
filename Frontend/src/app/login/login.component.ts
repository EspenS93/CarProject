import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from "../authenticator.service";
import { Router } from '@angular/router'
import { User } from "../user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  authkey: string;
  enabledAuth: boolean = false;
  constructor(
    private authenticator: AuthenticatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  closeLoginModal(): void {
    document.getElementById('loginModal').style.display = 'none';
  }

  login(): void {
    this.authenticator.login(this.user)
        .subscribe(result => {
          if(result === true){
            location.reload();
          } else {
            location.reload();
          }
    });

    
    /*
    // check if user has 2FA show 2FA auth input and remember username and password
    //let userHas2FA =authenticator.checkUserHas2FA();
    if (userHas2FAtrue) {
      this.enabledAuth = true;
      //authenticator.authenticate(user,authkey);
    } else {
      //authenticator.authenticate(user);
    }*/
  }

}
