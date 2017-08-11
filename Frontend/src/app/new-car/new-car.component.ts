import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CarService } from "../car.service";
import { ImageService } from "../image.service";
import { Car } from "../car";
import { Image } from "../image";

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {
  car: Car;
  imageList: Image[];
  image: Image;
  files: FileList;
  preview: boolean = false;
  slideIndex = 1;

  constructor(
    private carService: CarService,
    private imageService: ImageService,
    private location: Location) { }

  ngOnInit() {
    this.image = new Image();
    this.car = new Car();
    this.imageList = [];
  }

  readThis(inputValue: HTMLInputElement) {
    this.files = inputValue.files;
    for (let i = 0; i < this.files.length; i++) {
      let myReader: FileReader = new FileReader();
      myReader.onload = (e) => {
        
        this.image.image = myReader.result;
      }
      myReader.readAsDataURL(this.files[i]);
    }
  }

  fileChangeEvent($event) {
    this.image = new Image();
    this.readThis($event.target);
  }

  add(): void {
    this.image.contentType = this.files[0].type;
    this.image.name = this.files[0].name;
    this.carService.create(this.car).then(car => { this.image.carId = car.id; this.imageService.create(this.image) }).then(a => { this.location.back(); });
  }

  previewCar(): void {
    this.preview = !this.preview;
    this.slideshow(this.slideIndex)
  }
  slideshow(n): void {
    let i;
    let x: any = document.getElementsByClassName("mySlides");
    if (n > x.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = x.length;
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[this.slideIndex - 1].style.display = "block";
    }
  }
}
