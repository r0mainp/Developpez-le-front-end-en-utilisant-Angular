import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from 'src/app/core/models/Country';
import { LineData } from 'src/app/core/models/LineData';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{

  @Input() country !: Country;


  view!: [number, number];
  countryFormattedData!: LineData[];

  constructor(private chartsService: ChartsService){
    this.view = [innerWidth / 1.35, 400];
  }

  ngOnInit(): void {
    this.countryFormattedData = this.chartsService.getLineData(this.country.participations);
  }
  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
