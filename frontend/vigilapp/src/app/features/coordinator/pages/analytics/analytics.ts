import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { COORDINATOR_DAY, MOCK_INCIDENTS, MOCK_ZONES, getCurrentUser } from '../home/coordinator-home.data';

@Component({
	selector: 'app-coordinator-analytics',
	imports: [CommonModule, FormsModule],
	templateUrl: './analytics.html',
	styleUrl: './analytics.css',
})
export class CoordinatorAnalytics {
	private readonly router = inject(Router);

	protected readonly user = getCurrentUser();
	protected readonly zones = MOCK_ZONES;
	protected readonly coordinatorDay = COORDINATOR_DAY;
	protected timeRange = '7d';
	protected selectedZone = 'all';

	protected readonly incidentTypes = [
		{ label: 'Seguridad física', value: 8, color: 'bg-rose-500' },
		{ label: 'Convivencia', value: 5, color: 'bg-amber-500' },
		{ label: 'Uso del espacio', value: 3, color: 'bg-sky-500' },
		{ label: 'Observación social', value: 2, color: 'bg-violet-500' },
	];

	protected readonly severityBreakdown = [
		{ label: 'S1 - Bajo', value: 10, percent: 55, color: 'bg-amber-500' },
		{ label: 'S2 - Medio', value: 6, percent: 33, color: 'bg-orange-500' },
		{ label: 'S3 - Alto', value: 2, percent: 12, color: 'bg-rose-500' },
	];

	protected readonly peakHours = [
		{ label: '10:00', incidents: 5, tone: 'bg-amber-50 border-amber-200 text-amber-700' },
		{ label: '12:00', incidents: 8, tone: 'bg-rose-50 border-rose-200 text-rose-700' },
		{ label: '13:00', incidents: 4, tone: 'bg-sky-50 border-sky-200 text-sky-700' },
		{ label: '15:00', incidents: 3, tone: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
	];

	get incidentsByZone(): Array<{ id: string; zone: string; count: number; max: number }> {
		const filtered = this.selectedZone === 'all'
			? this.zones
			: this.zones.filter(zone => zone.id === this.selectedZone);

		const counts = filtered.map(zone => ({
			id: zone.id,
			zone: zone.name,
			count: MOCK_INCIDENTS.filter(incident => incident.zoneId === zone.id).length,
		}));
		const max = Math.max(...counts.map(item => item.count), 1);

		return counts.map(item => ({ ...item, max }));
	}

	get totalIncidents(): number {
		return MOCK_INCIDENTS.length;
	}

	get compliance(): string {
		const totalToday = this.zones.length;
		const covered = Math.max(totalToday - 1, 1);
		return `${Math.round((covered / totalToday) * 100)}%`;
	}

	get responseTime(): string {
		return '2.5 min';
	}

	get riskZones(): number {
		return this.zones.filter(zone => (zone.intensidad || 0) >= 5).length;
	}

	goBack(): void {
		void this.router.navigateByUrl('/coordinator');
	}

	exportReports(): void {
		console.log('Exportando reporte del coordinador');
	}

	trackById(_: number, item: { id: string }): string {
		return item.id;
	}

	trackByLabel(_: number, item: { label: string }): string {
		return item.label;
	}
}