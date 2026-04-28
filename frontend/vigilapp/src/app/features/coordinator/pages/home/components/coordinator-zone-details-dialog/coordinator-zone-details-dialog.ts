import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CoordinatorIncident, CoordinatorShift, CoordinatorZone } from '../../coordinator-home.models';

@Component({
  selector: 'app-coordinator-zone-details-dialog',
  imports: [CommonModule],
  templateUrl: './coordinator-zone-details-dialog.html',
  styleUrl: './coordinator-zone-details-dialog.css',
})
export class CoordinatorZoneDetailsDialog {
  @Input() zone: CoordinatorZone | null = null;
  @Input() shifts: CoordinatorShift[] = [];
  @Input() incidents: CoordinatorIncident[] = [];
  @Input() incidentSummary: { total: number; lastMonth: number; lastWeek: number } = {
    total: 0,
    lastMonth: 0,
    lastWeek: 0
  };
  @Input() currentTeacherName = '';
  @Input() currentTeacherLabel = '';

  @Output() close = new EventEmitter<void>();

  getColorForIntensidad(intensidad: number | undefined): string {
    if (!intensidad) return '#9ca3af'; // Gris por defecto
    // Escala de riesgo: 1-3 VERDE (Low), 4-7 NARANJA (Medium), 8-9 ROJO (High), 10 ROJO OSCURO (Extreme)
    if (intensidad <= 3) {
      return '#16a34a'; // Verde
    } else if (intensidad <= 7) {
      return '#d97706'; // Naranja
    } else if (intensidad <= 9) {
      return '#dc2626'; // Rojo
    } else {
      return '#7f1d1d'; // Rojo oscuro
    }
  }

  getIntensidadLabel(intensidad: number | undefined): string {
    if (!intensidad) return 'Sin definir';
    if (intensidad <= 3) {
      return 'Low';
    } else if (intensidad <= 7) {
      return 'Medium';
    } else if (intensidad <= 9) {
      return 'High';
    } else {
      return 'Extreme';
    }
  }
}
