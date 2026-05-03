import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './alert-panel.component.html',
  styleUrl: './alert-panel.component.scss'
})
export class AlertPanelComponent {
  @Input() alert: any;
  @Output() close = new EventEmitter<void>();

  getAlertClass(): string {
    return this.alert?.type || 'info';
  }

  getIcon(): string {
    if (this.alert?.type === 'critical') return '🚨';
    if (this.alert?.type === 'warning') return '⚠️';
    return 'ℹ️';
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  }

  onClose(): void {
    this.close.emit();
  }
}
