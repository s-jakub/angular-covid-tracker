import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.css'],
})
export class CountryChartComponent implements OnInit, OnChanges {
  @Input() country: string = 'Poland';

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Confirmed Cases',
    },
  ];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getCountryData();
  }

  getCountryData() {
    this.dataService
      .getCountryDataByDate(
        this.country,
        '2020-03-01T00:00:00Z&to=2022-01-01T00:00:00Z'
      )
      .subscribe((res: any) => {
        this.barChartData[0].data = res.map((obj: any) => obj['Cases']);
        this.barChartLabels = res.map((obj: any) =>
          obj['Date'].substring(0, 10)
        );
      });
  }
}
