import { Injectable } from '@angular/core';
import { Car } from './car'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CarService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private carsUrl = '/api/cars';  // URL to web api
  constructor(private http: Http) { }

  getCars(): Promise<Car[]> {
    return this.http.get(this.carsUrl)
      .toPromise()
      .then(response => response.json() as Car[])
      .catch(this.handleError);
  }

  getTopCars(cars: number): Promise<Car[]> {
    const url = `${this.carsUrl}/${cars}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Car[])
      .catch(this.handleError);
  }

  getCar(id: AAGUID): Promise<Car> {
    const url = `${'api/car'}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Car)
      .catch(this.handleError);
  }

  delete(id: AAGUID): Promise<void> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  create(car: Car): Promise<Car> {
    return this.http
      .post(this.carsUrl, JSON.stringify(car), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Car)
      .catch(this.handleError);
  }
 
  update(car: Car): Promise<Car> {
    const url = `${this.carsUrl}/${car.id}`;
    return this.http
      .put(url, JSON.stringify(car), {headers: this.headers})
      .toPromise()
      .then(() => car)
      .catch(this.handleError);
  }

  search(searchTerm: string): Promise<Car[]> {
    const url = `${'/api/findCars'}/${searchTerm}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Car[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
