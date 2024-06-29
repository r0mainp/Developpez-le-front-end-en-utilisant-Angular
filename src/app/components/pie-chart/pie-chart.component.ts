import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/core/models/Country';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  @Input() countries!: Country[]

  view: [number, number] = [700, 300];

  formattedData!: {name: string, value: number, extra: {id: number}}[];

  constructor(private router: Router){
    
  }

  ngOnInit(): void {
    this.formatData()
    Object.assign(this, this.formattedData)
  }

  redirectToDetails(country: {name: string, value: number, extra: {id: number}}){
    this.router.navigateByUrl(`details/${country.extra.id}`)
  }

  private formatData(){
    this.formattedData = this.countries.map( data => {
      const totalMedal = data.participations.reduce((total, participation) => total + participation.medalsCount, 0)
      return {
        name: data.country,
        value: totalMedal,
        extra: {
          id: data.id,
        }
      }
    })
  }
}
