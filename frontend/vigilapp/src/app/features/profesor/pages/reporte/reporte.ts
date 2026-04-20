import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlassCard } from '../../../../shared/ui/glass-card/glass-card';

@Component({
  selector: 'app-reporte',
  imports: [CommonModule, FormsModule, GlassCard],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reporte {
  zonas = [
    { id: 1, nombre: 'Patio Principal', descripcion: 'Área central de recreo' },
    { id: 2, nombre: 'Cancha Deportiva', descripcion: 'Zona de deporte' },
    { id: 3, nombre: 'Cafetería', descripcion: 'Área de comedor' },
    { id: 4, nombre: 'Jardín', descripcion: 'Zona verde' },
    { id: 5, nombre: 'Pasillo Primaria', descripcion: 'Corredor edificio A' },
    { id: 6, nombre: 'Aula de Clases', descripcion: 'Espacio académico' },
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
    this.zonaSeleccionada.set(null);
    this.tipoSeleccionado.set(null);
    this.severidadSeleccionada.set(null);
    this.descripcion.set('');
    this.departamentosSeleccionados.set(new Set());
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
