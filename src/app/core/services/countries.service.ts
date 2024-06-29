import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private olympicUrl = './assets/mock/olympic.json';
  private countries$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.countries$.next(value)),
      catchError((error) => {
        // TODO: improve error handling
        console.error('Error while loading data', error.message);
        // can be useful to end loading state and let the user know something went wrong
        this.countries$.next([]);
        return of([]);
      })
    );
  }

  getCountries() {
    return this.countries$.asObservable();
  }
  getCountryById(id: number){
    return this.countries$.pipe(
      // TODO: find a way to use find() and return an Olympic
      map(countries => countries.filter(country => country.id === id))
    )
  }
}
