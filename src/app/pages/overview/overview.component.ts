import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPanelComponent } from '../../components/alert-panel/alert-panel.component';
import { AssetCardComponent } from '../../components/asset-card/asset-card.component';
import { SiteGridComponent } from '../../components/site-grid/site-grid.component';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule, 
    AlertPanelComponent,
    AssetCardComponent,
    SiteGridComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  criticalAlerts: any[] = [];
  sites: any[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.criticalAlerts = this.mockDataService.getCriticalAlerts();
    this.sites = this.mockDataService.getSites();
  }
}
