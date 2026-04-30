import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
	MOCK_INCIDENTS,
	MOCK_SHIFTS,
	getCurrentUser,
} from '../home/coordinator-home.data';
import { CoordinatorShift, CoordinatorTeacher } from '../home/coordinator-home.models';

@Component({
	selector: 'app-coordinator-dashboard',
	imports: [CommonModule],
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.css',
})
export class CoordinatorDashboard {
	private readonly router = inject(Router);

	protected readonly user = getCurrentUser();
	protected readonly today = '2026-02-26';
	protected readonly activeShifts = MOCK_SHIFTS.filter(shift => shift.date === this.today && shift.status === 'active');
	protected readonly missedShifts = MOCK_SHIFTS.filter(shift => shift.date === this.today && shift.status === 'missed');
	protected readonly todayIncidents = MOCK_INCIDENTS.filter(incident => incident.timestamp.startsWith(this.today));
	protected readonly availableTeachers: CoordinatorTeacher[] = [
		{ id: 't1', name: 'Laura Peña', department: 'Ciencias Sociales', isActive: true },
		{ id: 't2', name: 'Andrés Mora', department: 'Matemáticas', isActive: true },
		{ id: 't3', name: 'Sofía Rojas', department: 'Lengua', isActive: true },
		{ id: 't4', name: 'Miguel Torres', department: 'Tecnología', isActive: true },
	];

	protected showAvailableShift = true;
	protected showAssignDialog = false;
	protected showReassignDialog = false;
	protected reassignShift: CoordinatorShift | null = null;
	protected availableShift: Pick<CoordinatorShift, 'zoneName' | 'startTime' | 'endTime'> & { canceledBy: string } = {
		zoneName: 'Cafeteria Bachillerato',
		startTime: '11:00',
		endTime: '11:30',
		canceledBy: 'Prof. María González',
	};

	get pendingAlertLabel(): string {
		return this.missedShifts[0]?.zoneName || 'Sin alertas';
	}

	onSignOut(): void {
		void this.router.navigateByUrl('/login');
	}

	navigateToLive(): void {
		void this.router.navigateByUrl('/coordinator/live');
	}

	navigateToAnalytics(): void {
		void this.router.navigateByUrl('/coordinator/analytics');
	}

	openReassignDialog(shift: CoordinatorShift): void {
		this.reassignShift = shift;
		this.showReassignDialog = true;
	}

	closeReassignDialog(): void {
		this.showReassignDialog = false;
		this.reassignShift = null;
	}

	assignAvailableShift(): void {
		this.showAssignDialog = false;
		this.showAvailableShift = false;
	}

	confirmReassign(): void {
		this.closeReassignDialog();
	}
}