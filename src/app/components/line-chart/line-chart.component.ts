import { Component, Input, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{

  @Input() country !: Olympic;


  view: [number, number]= [700, 300];
  olympicDetail!: {
      name: string,
      series:
        {
          value: number, // medalsCount
          name: string, // year
        }[]
    }[];

  /* 
  {
    "name": "North Korea",
    "series": [
      {
        "value": 2076,
        "name": "2016-09-23T13:10:43.508Z"
      },
      {
        "value": 4175,
        "name": "2016-09-21T12:38:19.327Z"
      },
      {
        "value": 3314,
        "name": "2016-09-22T06:59:43.320Z"
      },
      {
        "value": 4627,
        "name": "2016-09-22T12:50:33.330Z"
      },
      {
        "value": 4000,
        "name": "2016-09-20T14:11:07.105Z"
      }
    ]
  },
   */

  ngOnInit(): void {
    this.olympicDetail = this.formatCountryData();
  }

  private formatCountryData() {

    const series = this.country.participations.map(participation => {
      console.log(participation)
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
