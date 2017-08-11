import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CarsComponent }        from './cars/cars.component';
import { CarDetailComponent }   from './car-detail/car-detail.component';
import { NewCarComponent }      from './new-car/new-car.component';
import { LoginComponent }       from './login/login.component';
import { AuthGuard }            from './auth-guard.service'
 
const routes: Routes = [
  { path: 'detail/:id', component: CarDetailComponent },
  { path: 'cars',     component: CarsComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'newCar', component: NewCarComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}