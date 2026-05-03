import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.scss'
})
export class AssetCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() unit: string = '';
  @Input() status: 'good' | 'warning' | 'critical' = 'good';

  getStatusClass(): string {
    return this.status;
  }
}
