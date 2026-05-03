import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  siteId?: string;
  assetId?: string;
  timestamp: Date;
  actionUrl?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'BESS' | 'PV' | 'EV_CHARGER';
  soc?: number; // State of Charge
  capacity?: number;
  power?: number;
  status: 'active' | 'idle' | 'fault';
}

export interface Site {
  id: string;
  name: string;
  location: string;
  assets: Asset[];
  revenue_today?: number;
  efficiency?: number;
}

export interface ChargingSession {
  id: string;
  evId: string;
  chargerId: string;
  startTime: Date;
  currentSoC: number;
  targetSoC: number;
  power: number;
  status: 'charging' | 'waiting' | 'complete';
  estimatedComplete?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Simulate real-time updates
    setInterval(() => {
      this.alertsSubject.next(this.generateRandomAlerts());
    }, 5000);
  }

  private generateRandomAlerts(): Alert[] {
    const alerts: Alert[] = [];
    const alertTypes = ['BESS_LOW_SOC', 'HIGH_TEMP', 'CHARGER_OFFLINE', 'GRID_OVERLOAD'];
    
    for (let i = 0; i < Math.random() * 3; i++) {
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      alerts.push({
        id: `alert-${Date.now()}-${i}`,
        type: Math.random() > 0.7 ? 'critical' : 'warning',
        title: this.getAlertTitle(type),
        description: this.getAlertDescription(type),
        siteId: `site-${Math.floor(Math.random() * 12) + 1}`,
        timestamp: new Date(),
        actionUrl: `/site/${Math.floor(Math.random() * 12) + 1}`
      });
    }
    return alerts;
  }

  private getAlertTitle(type: string): string {
    const titles: { [key: string]: string } = {
      'BESS_LOW_SOC': 'Low Battery State',
      'HIGH_TEMP': 'Temperature Warning',
      'CHARGER_OFFLINE': 'Charger Offline',
      'GRID_OVERLOAD': 'Grid Overload Risk'
    };
    return titles[type] || 'System Alert';
  }

  private getAlertDescription(type: string): string {
    const descriptions: { [key: string]: string } = {
      'BESS_LOW_SOC': 'Battery at 15% - may not meet peak shaving targets',
      'HIGH_TEMP': 'BESS temperature 65°C - thermal management needed',
      'CHARGER_OFFLINE': 'Fast charger #3 not responding to commands',
      'GRID_OVERLOAD': 'Predicted demand spike in next 30 minutes'
    };
    return descriptions[type] || 'Check system status';
  }

  getCriticalAlerts(): Alert[] {
    return [
      {
        id: 'alert-1',
        type: 'critical',
        title: 'BESS #2 Low State of Charge',
        description: 'Site Northpoint: Battery at 18%. Will not meet peak shaving commitment in 2 hours.',
        siteId: 'site-2',
        timestamp: new Date(Date.now() - 5 * 60000),
        actionUrl: '/site/site-2'
      },
      {
        id: 'alert-2',
        type: 'warning',
        title: 'Charger #12 Offline',
        description: 'Site Westside Depot: Fast charger not responding. 3 EVs queued.',
        siteId: 'site-3',
        timestamp: new Date(Date.now() - 15 * 60000),
        actionUrl: '/site/site-3'
      },
      {
        id: 'alert-3',
        type: 'warning',
        title: 'High Temperature Alert',
        description: 'Site Downtown Hub: BESS #1 at 68°C. Reducing charge rate.',
        siteId: 'site-1',
        timestamp: new Date(Date.now() - 8 * 60000),
        actionUrl: '/site/site-1'
      }
    ];
  }

  getSites(): Site[] {
    return [
      {
        id: 'site-1',
        name: 'Downtown Hub',
        location: 'San Francisco, CA',
        revenue_today: 2450,
        efficiency: 94,
        assets: [
          { id: 'bess-1', name: 'BESS #1', type: 'BESS', capacity: 500, soc: 75, power: 150, status: 'active' },
          { id: 'pv-1', name: 'Solar Array', type: 'PV', power: 200, status: 'active' },
          { id: 'charger-1', name: 'Fast Charger', type: 'EV_CHARGER', power: 50, status: 'active' }
        ]
      },
      {
        id: 'site-2',
        name: 'Northpoint',
        location: 'Oakland, CA',
        revenue_today: 1820,
        efficiency: 88,
        assets: [
          { id: 'bess-2', name: 'BESS #2', type: 'BESS', capacity: 400, soc: 18, power: 0, status: 'fault' },
          { id: 'pv-2', name: 'Solar Array', type: 'PV', power: 180, status: 'active' },
          { id: 'charger-2', name: 'Standard Charger', type: 'EV_CHARGER', power: 30, status: 'active' }
        ]
      },
      {
        id: 'site-3',
        name: 'Westside Depot',
        location: 'Los Angeles, CA',
        revenue_today: 3100,
        efficiency: 92,
        assets: [
          { id: 'bess-3', name: 'BESS #3', type: 'BESS', capacity: 600, soc: 65, power: 180, status: 'active' },
          { id: 'pv-3', name: 'Solar Array', type: 'PV', power: 250, status: 'active' },
          { id: 'charger-3', name: 'Fast Charger', type: 'EV_CHARGER', power: 45, status: 'idle' }
        ]
      },
      {
        id: 'site-4',
        name: 'East Gateway',
        location: 'Portland, OR',
        revenue_today: 1640,
        efficiency: 85,
        assets: [
          { id: 'bess-4', name: 'BESS #4', type: 'BESS', capacity: 350, soc: 52, power: 100, status: 'active' },
          { id: 'pv-4', name: 'Solar Array', type: 'PV', power: 160, status: 'active' },
          { id: 'charger-4', name: 'Standard Charger', type: 'EV_CHARGER', power: 25, status: 'active' }
        ]
      }
    ];
  }

  getChargingSessions(): ChargingSession[] {
    return [
      {
        id: 'session-1',
        evId: 'EV-001',
        chargerId: 'charger-1',
        startTime: new Date(Date.now() - 45 * 60000),
        currentSoC: 65,
        targetSoC: 90,
        power: 45,
        status: 'charging',
        estimatedComplete: new Date(Date.now() + 20 * 60000)
      },
      {
        id: 'session-2',
        evId: 'EV-002',
        chargerId: 'charger-2',
        startTime: new Date(Date.now() - 120 * 60000),
        currentSoC: 45,
        targetSoC: 80,
        power: 30,
        status: 'charging',
        estimatedComplete: new Date(Date.now() + 50 * 60000)
      },
      {
        id: 'session-3',
        evId: 'EV-003',
        chargerId: 'charger-3',
        startTime: new Date(Date.now() - 180 * 60000),
        currentSoC: 88,
        targetSoC: 100,
        power: 15,
        status: 'charging',
        estimatedComplete: new Date(Date.now() + 15 * 60000)
      },
      {
        id: 'session-4',
        evId: 'EV-004',
        chargerId: 'charger-4',
        startTime: new Date(Date.now() - 5 * 60000),
        currentSoC: 20,
        targetSoC: 100,
        power: 50,
        status: 'waiting',
        estimatedComplete: undefined
      }
    ];
  }

  getRevenueData(): any {
    return {
      today: 12450,
      week: 78320,
      month: 285600,
      bySource: [
        { source: 'Peak Shaving', revenue: 5200 },
        { source: 'EV Charging', revenue: 3850 },
        { source: 'Arbitrage', revenue: 2400 },
        { source: 'Frequency Response', revenue: 1000 }
      ]
    };
  }

  getAlerts(): Observable<Alert[]> {
    return this.alerts$;
  }
}
