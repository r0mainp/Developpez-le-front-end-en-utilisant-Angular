import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
      
  }
}
