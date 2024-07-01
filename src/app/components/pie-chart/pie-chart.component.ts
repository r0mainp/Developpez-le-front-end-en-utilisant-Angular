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

  view!: [number, number];

  formattedData!: PieData[];

  constructor(
    private router: Router,
    private chartsService: ChartsService
  ){
    this.view = [innerWidth / 1.35, 400];
  }

  ngOnInit(): void {
    this.formattedData = this.chartsService.getPieData(this.countries)
  }

  /**
   * Trigger navigation to the details page using a country's id
   * 
   * @param {PieData} country - The pie data of a specific country
   */
  redirectToDetails(country: PieData){
    this.router.navigateByUrl(`details/${country.extra.id}`)
  }
  onResize(event: any) {
      this.view = [event.target.innerWidth / 1.35, 400];
  }
}
