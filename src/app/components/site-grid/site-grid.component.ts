import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-grid.component.html',
  styleUrl: './site-grid.component.scss'
})
export class SiteGridComponent {
  @Input() sites: any[] = [];

  getAssetBadgeClass(status: string): string {
    if (status === 'active') return 'active';
    if (status === 'idle') return 'idle';
    return 'fault';
  }
}
