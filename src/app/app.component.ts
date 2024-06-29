import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CountriesService } from './core/services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.loadInitialData().pipe(take(1)).subscribe();
  }
}
