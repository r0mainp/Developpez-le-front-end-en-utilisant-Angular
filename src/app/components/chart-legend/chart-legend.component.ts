import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/core/models/Country';
import { Legend } from 'src/app/core/models/Legend';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrl: './chart-legend.component.scss'
})
export class ChartLegendComponent implements OnInit{
  @Input() countries !: Country[];
  @Input() country !: Country;
  @Input() page: 'home' | 'detail' = 'home';

  legend!: Legend;

  constructor(private chartsService: ChartsService){}

  ngOnInit(): void {
    this.legend = this.initLegend(this.page)
  }

  /**
   * Returns the Legend data base on the current page.
   * 
   * @param {string} page - Current page, can be either 'home' or 'detail'.
   * @returns {Legend} return Legend data.
   */
  private initLegend(page: 'home' | 'detail'): Legend {
    return page === 'home'?
      this.chartsService.getHomeChartLegendData(this.countries):
      this.chartsService.getDetailChartLegendData(this.country)
  }
}
