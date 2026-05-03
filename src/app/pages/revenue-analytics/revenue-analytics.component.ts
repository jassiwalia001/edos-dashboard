import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-revenue-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-analytics.component.html',
  styleUrl: './revenue-analytics.component.scss'
})
export class RevenueAnalyticsComponent implements OnInit {
  revenueData: any;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.revenueData = this.mockDataService.getRevenueData();
  }

  getPercentage(value: number): number {
    const total = this.revenueData.today;
    return Math.round((value / total) * 100);
  }
}
