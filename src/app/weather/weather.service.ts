import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, mergeMap, filter, toArray, share, tap, catchError, retry} from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';

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

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

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
        map(value => value['list']),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          }
        }),
        toArray(),
        share()
      ) as Observable<ForecastData[]>
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
    }).pipe(
      retry(1),
      // only executed if observable emits value
      tap(() => {
        this.notificationService.addSuccess('Got your location!')
      }),
      catchError((err) => {
        // handle error
        this.notificationService.addError('Failed to get your location.')
        // Return a new Observable to emit values for rest of pipeline
        // set default location
        return throwError(() => new Error('Failed to get your location.')); // observable
      })
    );
  }
}

interface ForecastData {
  dateString: string;
  temp: number
}
