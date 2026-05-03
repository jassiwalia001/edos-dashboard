import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss'
})
export class RevenueChartComponent implements OnInit {
  @Input() title: string = 'Revenue Chart';
  @Input() data: ChartDataPoint[] = [];

  maxValue: number = 0;

  ngOnInit() {
    this.maxValue = Math.max(...this.data.map(d => d.value), 1000);
  }
}
