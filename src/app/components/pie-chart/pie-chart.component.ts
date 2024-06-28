import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  @Input() olympics!: Olympic[]

  view: [number, number] = [700, 300];

  formattedData!: {name: string, value: number}[];

  constructor(){
    
  }

  ngOnInit(): void {
    this.formatData()
    Object.assign(this, this.formattedData)
  }
  private formatData(){
    this.formattedData = this.olympics.map( data => {
      const totalMedal = data.participations.reduce((total, participation) => total + participation.medalsCount, 0)
      return {
        name: data.country,
        value: totalMedal
      }
    })
  }
}
