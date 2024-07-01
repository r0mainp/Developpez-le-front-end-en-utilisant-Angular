import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  /**
   * URL to the local JSON file containing the Olympic data.
   * @private
   */
  private olympicUrl = './assets/mock/olympic.json';

  /**
   * BehaviorSubject holding the list of countries.
   * It is initialized with an empty array and updated when the data is loaded.
   * @private
   */
  private countries$ = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Fetches initial data from the Olympic API endpoint and updates the `countries$` BehaviorSubject.
   *
   * It uses an HTTP GET request to retrieve an array of `Country` from `olympicUrl`.
   * On success the data is added to the `countries$` BehaviorSubject.
   * If an error is catched, the error is logged and an empty array is added countries$,
   * and an observable of an empty array is returned to handle the error in the component template.
   *
   * @returns {Observable<Country[]>} An observable that emits the fetched `Country` array or an empty.
   */

  loadInitialData(): Observable<Country[]>{
    return this.http.get<Country[]>(this.olympicUrl).pipe(
      tap((value) => this.countries$.next(value)),
      catchError((error) => {
        console.error('Error while loading data', error.message);
        this.countries$.next([]);
        return of([]);
      })
    );
  }

  /**
   * Returns an observable of the current list of countries.
   * 
   * @returns {Observable<Country[]>} An observable that emits the current list of countries.
   */
  getCountries(): Observable<Country[]>{
    return this.countries$.asObservable();
  }
  
  /**
   * Returns a Country based on an id
   * 
   * @param {number} id  - A number being the country's id to find
   * @returns {Observable<Country[]>} An observable that emits an array containing the country with the specified id or an empty array if not found. 
   */
  getCountryById(id: number): Observable<Country[]>{
    return this.countries$.pipe(
      map(countries => countries.filter(country => country.id === id))
    )
  }
}
