import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from "./auth-guard.service";
import { AuthenticatorService } from "./authenticator.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn:boolean = false;
constructor(
    private authGuard: AuthGuard,
    private authenticator: AuthenticatorService
  ) { 
    this.loggedIn= authGuard.canActivate();
  }
  toggleLoginModal(): void {
    document.getElementById('loginModal').style.display='block';
    
  }
  logout():void {
    this.authenticator.logout();
  }

  toggleMenu(): void {
    var rigthMenu = document.getElementById("rightMenu");
    if(rigthMenu.style.display == "block"){
    rigthMenu.style.display= "none";
    }else{
      rigthMenu.style.display = "block";
    }
    
  }
}
