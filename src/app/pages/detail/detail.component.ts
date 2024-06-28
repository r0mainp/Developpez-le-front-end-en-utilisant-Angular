import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{

  country$!: Observable<Olympic>;


  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.country$ = this.olympicService.getOlympicsById(parseInt(countryId)).pipe(
      map(countrys => countrys[0])
    )
  }
}
