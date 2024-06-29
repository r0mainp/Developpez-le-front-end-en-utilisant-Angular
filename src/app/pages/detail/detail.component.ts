import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { CountriesService } from 'src/app/core/services/countries.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{

  country$!: Observable<Country>;


  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.country$ = this.countriesService.getCountryById(parseInt(countryId)).pipe(
      map(countries => countries[0])
    )
  }
}
