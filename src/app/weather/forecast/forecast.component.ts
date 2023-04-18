import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent {

  forecastData: ForecastData[] = [];

  constructor(weatherService: WeatherService){
    weatherService.getForecast()
      .subscribe((forecastData) => {
        this.forecastData = forecastData;
      });
  }

}

interface ForecastData {
  dateString: string;
  temp: number
}