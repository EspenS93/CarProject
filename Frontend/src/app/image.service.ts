import { Injectable } from '@angular/core';
import { Image } from './image'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImageService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private imagesUrl = '/api/images';  // URL to web api
  constructor(private http: Http) { }

  getImages(carIds: string[]): Promise<Image[]> {
    return this.http.get(this.imagesUrl)
      .toPromise()
      .then(response => response.json() as Image[])
      .catch(this.handleError);
  }

  getImage(id: string): Promise<Image> {
    const url = `${'api/carimage'}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Image)
      .catch(this.handleError);
  }

  delete(carId: string): Promise<void> {
    const url = `${this.imagesUrl}/${carId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  create(image: Image): Promise<Image> {
    return this.http
      .post(this.imagesUrl, JSON.stringify(image), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Image)
      .catch(this.handleError);
  }
 
  update(image: Image): Promise<Image> {
    const url = `${this.imagesUrl}/${image.id}`;
    return this.http
      .put(url, JSON.stringify(image), {headers: this.headers})
      .toPromise()
      .then(() => image)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
