import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-charging-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charging-sessions.component.html',
  styleUrl: './charging-sessions.component.scss'
})
export class ChargingSessionsComponent implements OnInit {
  sessions: any[] = [];
  activeCount = 0;
  waitingCount = 0;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.sessions = this.mockDataService.getChargingSessions();
    this.activeCount = this.sessions.filter(s => s.status === 'charging').length;
    this.waitingCount = this.sessions.filter(s => s.status === 'waiting').length;
  }

  getSessionClass(status: string): string {
    if (status === 'charging') return 'charging';
    if (status === 'waiting') return 'waiting';
    return 'completed';
  }

  getStatusColor(status: string): string {
    if (status === 'charging') return 'charging';
    if (status === 'waiting') return 'waiting';
    return 'completed';
  }

  getProgressPercent(current: number, target: number): number {
    const progress = ((current - 0) / (target - 0)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

  getTimeRemaining(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Soon';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }
}
