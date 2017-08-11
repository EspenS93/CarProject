import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from '../car';
import { Image } from '../image';
import { CarService } from '../car.service';
import { ImageService } from '../image.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  car: Car = new Car();
  cars: Car[];
  image: Image = new Image();
  selectedCar: Car;

  constructor(
    private carService: CarService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService
      .getCars()
      .then(cars => this.cars = cars);
  }

  search(term: HTMLInputElement): void {
    if(term.value.length <=0){
      this.getCars();
    }else{
      this.carService.search(term.value).then(cars => this.cars = cars);
    }
  }

  add(): void {
    this.car.name = this.car.name.trim();
    if (!this.car.name) {
      return;
    }
    this.carService.create(this.car)
      .then(car => {
        this.cars.push(car);
        this.selectedCar = null;
      });
  }

  delete(car: Car): void {
    this.imageService.delete(car.id).then( () => this.carService
        .delete(car.id)
        .then(() => {
          this.cars = this.cars.filter(c => c !== car);
          if(this.selectedCar === car ) {
            this.selectedCar = null;
          }
        }))
    
  }

  onSelect(car: Car): void {
    this.selectedCar = car;
    this.imageService.getImage(this.selectedCar.id).then(image => this.image = image);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCar.id]);
  }
}
