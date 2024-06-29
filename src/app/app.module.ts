import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartLegendComponent } from './components/chart-legend/chart-legend.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    DetailComponent, 
    NotFoundComponent, 
    PieChartComponent,
    LineChartComponent,
    ChartLegendComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
