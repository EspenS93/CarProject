import { Component, OnInit } from '@angular/core';
import { CarService } from "../car.service";
import { ImageService } from "../image.service";
import { Car } from "../car";
import { Image } from "../image";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cars: Car[];
  images: Image[] = [];
  constructor(
    private carService: CarService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService
      .getTopCars(3)
      .then(cars => {this.cars = cars; this.getImages(cars);});
  }

  getImages(cars: Car[]): void {
    for(let car of cars){
      this.imageService.getImage(car.id).then(image => this.images[car.id]=image);
    }
  }
    
}
