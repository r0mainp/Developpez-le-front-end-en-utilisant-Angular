import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { CountriesService } from 'src/app/core/services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public countries$: Observable<Country[]> = of([]);

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries$ = this.countriesService.getCountries();
  }
}
