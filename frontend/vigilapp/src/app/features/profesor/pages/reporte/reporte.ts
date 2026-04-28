import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlassCard } from '../../../../shared/ui/glass-card/glass-card';

@Component({
  selector: 'app-reporte',
  imports: [CommonModule, FormsModule, GlassCard],
  templateUrl: './reporte.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reporte {
  constructor(private router: Router) {}
  zonas = [
    { id: 1, nombre: 'Bloque A', descripcion: 'Ingreso principal y pasillos administrativos', intensidad: 2 },
    { id: 2, nombre: 'Bloque B', descripcion: 'Aulas de ciencias y laboratorios', intensidad: 5 },
    { id: 3, nombre: 'Patio Central', descripcion: 'Zona de recreo y circulación de estudiantes', intensidad: 6 },
    { id: 4, nombre: 'Bloque C', descripcion: 'Biblioteca, sala de docentes y apoyo académico', intensidad: 3 },
  ];

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

  getColorForIntensidad(intensidad: number): string {
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

  getIntensidadLabel(intensidad: number): string {
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

  registrar() {
    console.log({
      zona: this.zonaSeleccionada(),
      tipo: this.tipoSeleccionado(),
      severidad: this.severidadSeleccionada(),
      descripcion: this.descripcion(),
      departamentos: [...this.departamentosSeleccionados()],
    });
  }
}
