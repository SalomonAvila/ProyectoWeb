import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlassCard } from '../../../../shared/ui/glass-card/glass-card';
import { REPORT_ZONE_OPTIONS } from '../../../coordinator/pages/home/coordinator-zone-catalog';
import { ToastItem, ToastStack } from '../../../../shared/ui/toast-stack/toast-stack';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, GlassCard],
  templateUrl: './reporte.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reporte {
  constructor(private router: Router) {}
  toastComponent = ToastStack;
  zonas = REPORT_ZONE_OPTIONS;

  tiposIncidente = [
    { id: 1, nombre: 'Seguridad Física', descripcion: 'Caída, golpe, accidente' },
    { id: 2, nombre: 'Convivencia', descripcion: 'Pelea, agresión, conflicto' },
    { id: 3, nombre: 'Uso del Espacio', descripcion: 'Mal uso de instalaciones' },
    { id: 4, nombre: 'Observación Social', descripcion: 'Aislamiento, conducta' },
  ];

  severidades = [
    { codigo: 'S1', nombre: 'Leve', descripcion: 'Situación menor' },
    { codigo: 'S2', nombre: 'Seguimiento', descripcion: 'Requiere atención' },
    { codigo: 'S3', nombre: 'Urgente', descripcion: 'Atención inmediata' },
  ];

  departamentos = [
    { id: 1, nombre: 'Enfermería' },
    { id: 2, nombre: 'Aseo' },
    { id: 3, nombre: 'Psicología' },
    { id: 4, nombre: 'Vida Comunitaria' },
  ];

  zonaSeleccionada = signal<number | null>(null);
  tipoSeleccionado = signal<number | null>(null);
  severidadSeleccionada = signal<string | null>(null);
  descripcion = signal<string>('');
  departamentosSeleccionados = signal<Set<number>>(new Set());
  toasts = signal<ToastItem[]>([]);
  private toastId = 0;

  seleccionarZona(id: number) {
    this.zonaSeleccionada.set(id);
  }

  seleccionarTipo(id: number) {
    this.tipoSeleccionado.set(id);
  }

  seleccionarSeveridad(codigo: string) {
    this.severidadSeleccionada.set(codigo);
  }

  toggleDepartamento(id: number) {
    const actual = new Set(this.departamentosSeleccionados());
    if (actual.has(id)) {
      actual.delete(id);
    } else {
      actual.add(id);
    }
    this.departamentosSeleccionados.set(actual);
  }

  onDescripcionChange(valor: string) {
    this.descripcion.set(valor);
  }

  cancelar() {
    this.router.navigate(['/profesor/home']);
  }

  registrar() {
    const zona = this.zonas.find(item => item.id === this.zonaSeleccionada())?.nombre ?? 'Sin zona';
    const tipo = this.tiposIncidente.find(item => item.id === this.tipoSeleccionado())?.nombre ?? 'Sin tipo';
    const severidad = this.severidades.find(item => item.codigo === this.severidadSeleccionada())?.nombre ?? 'Sin severidad';
    const destinatarios = this.departamentos
      .filter(dep => this.departamentosSeleccionados().has(dep.id))
      .map(dep => dep.nombre);

    const alertas: Omit<ToastItem, 'id'>[] = [
      {
        title: 'Incidente registrado',
        message: `${tipo} en ${zona} con severidad ${severidad}.`,
        kind: 'success',
      },
      {
        title: 'Notificaciones enviadas',
        message: destinatarios.length > 0
          ? `Correo enviado a: ${destinatarios.join(', ')}.`
          : 'No se seleccionaron destinatarios para notificar.',
        kind: 'info',
      },
    ];

    this.toasts.set(alertas.map(item => ({ ...item, id: ++this.toastId })));

    window.setTimeout(() => {
      this.toasts.set([]);
      void this.router.navigate(['/profesor/home']);
    }, 1800);
  }
}
