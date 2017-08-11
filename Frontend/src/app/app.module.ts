import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './car.service';
import { ImageService } from './image.service';
import { AuthenticatorService } from './authenticator.service';
import { AuthGuard } from './auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewCarComponent } from './new-car/new-car.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CarDetailComponent,
    CarsComponent,
    DashboardComponent,
    NewCarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CarService,
    ImageService,
    AuthenticatorService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
