import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Car } from '../car'
import { CarService } from '../car.service'
@Component({
  selector: 'app-new-component',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  constructor(
    private carService : CarService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.carService.getCar(params.get('id')))
      .subscribe(car => this.car = car);
  }

  save(): void {
    this.carService.update(this.car)
        .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
