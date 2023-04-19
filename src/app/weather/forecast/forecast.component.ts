import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent {

  forecast$: Observable<ForecastData[]>;

  constructor(weatherService: WeatherService){
    this.forecast$ = weatherService.getForecast()
  }

}

interface ForecastData {
  dateString: string;
  temp: number; 
}