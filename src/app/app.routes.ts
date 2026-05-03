import { Routes } from '@angular/router';
import { PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { SiteDetailComponent } from './pages/site-detail/site-detail.component';
import { ChargingSessionsComponent } from './pages/charging-sessions/charging-sessions.component';
import { RevenueAnalyticsComponent } from './pages/revenue-analytics/revenue-analytics.component';

export const APP_ROUTES: Routes = [
  { path: '', component: OverviewComponent, data: { title: 'Dashboard' } },
  { path: 'site/:id', component: SiteDetailComponent, data: { title: 'Site Detail' } },
  { path: 'charging', component: ChargingSessionsComponent, data: { title: 'EV Charging' } },
  { path: 'revenue', component: RevenueAnalyticsComponent, data: { title: 'Revenue Analytics' } },
  { path: '**', redirectTo: '' }
];
