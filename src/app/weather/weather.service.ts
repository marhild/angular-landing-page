import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray} from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

interface OpenWaetherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  } []
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '07c4b7745be6f41a00ad94156110259a');
        }),
        switchMap(params => this.http.get<OpenWaetherResponse>(this.url, {params})),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          }
        }),
        toArray()
      )
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      )
    })
  }
}