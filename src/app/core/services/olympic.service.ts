import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        // TODO: improve error handling
        console.error('Error while loading data', error.message);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
  getOlympicsById(id: number){
    return this.olympics$.pipe(
      // TODO: find a way to use find() and return an Olympic
      map(olympics => olympics.filter(olympic => olympic.id === id))
    )
  }
}
