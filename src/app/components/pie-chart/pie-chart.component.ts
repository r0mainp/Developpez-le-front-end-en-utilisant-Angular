import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/core/models/Country';
import { PieData } from 'src/app/core/models/PieData';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  @Input() countries!: Country[]

  view: [number, number] = [700, 300];

  formattedData!: PieData[];

  constructor(
    private router: Router,
    private chartsService: ChartsService
  ){
    
  }

  ngOnInit(): void {
    this.formattedData = this.chartsService.getPieData(this.countries)
  }

  redirectToDetails(country: {name: string, value: number, extra: {id: number}}){
    this.router.navigateByUrl(`details/${country.extra.id}`)
  }
}
