import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/core/models/Country';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{

  @Input() country !: Country
  ;


  view: [number, number]= [700, 300];
  countryFormattedData!: {
      name: string,
      series:
        {
          value: number, // medalsCount
          name: string, // year
        }[]
    }[];

  ngOnInit(): void {
    this.countryFormattedData = this.formatCountryData();
  }

  private formatCountryData() {
    const series = this.country.participations.map(participation => {
      return {
        value: participation.medalsCount,
        name: `${participation.city} - ${participation.year}`
      }
    })

    const data = [{
      name: 'Medals',
      series: series
    }]
    return data
  }
}
