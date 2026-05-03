import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-detail.component.html',
  styleUrl: './site-detail.component.scss'
})
export class SiteDetailComponent implements OnInit {
  site: any;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const siteId = params['id']; // e.g., "site-2"
      const sites = this.mockDataService.getSites();
      this.site = sites.find(s => s.id === siteId);
      
      // Fallback: if not found, try to find by numeric ID
      if (!this.site && !siteId.includes('site-')) {
        this.site = sites.find(s => s.id === `site-${siteId}`);
      }
    });
  }

  getAssetCardClass(status: string): string {
    if (status === 'active') return 'active';
    if (status === 'idle') return 'idle';
    return 'fault';
  }

  getStatusBadge(status: string): string {
    if (status === 'active') return 'active';
    if (status === 'idle') return 'idle';
    return 'fault';
  }
}
