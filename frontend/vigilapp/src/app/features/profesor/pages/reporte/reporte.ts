import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlassCard } from '../../../../shared/ui/glass-card/glass-card';

const ZONAS_VIGILANCIA = [
  { id: 1, nombre: 'Parque Bachillerato Izquierdo', descripcion: 'Zona oeste del bachillerato con control de ingreso y circulación.', intensidad: 4 },
  { id: 2, nombre: 'Parque Bachillerato central', descripcion: 'Corazón del área de bachillerato con tránsito alto de estudiantes.', intensidad: 5 },
  { id: 3, nombre: 'Parque preescolar', descripcion: 'Sector de preescolar con circulación controlada y acceso reducido.', intensidad: 4 },
  { id: 4, nombre: 'Coliseo', descripcion: 'Espacio cerrado para actividades múltiples y eventos institucionales.', intensidad: 10 },
  { id: 5, nombre: 'Cancha baloncesto', descripcion: 'Área deportiva abierta con recorridos frecuentes en horas pico.', intensidad: 8 },
  { id: 6, nombre: 'Cafeteria Bachillerato', descripcion: 'Punto de alimentación del bachillerato con afluencia media-baja.', intensidad: 1 },
  { id: 7, nombre: 'Cafeteria Preescolar', descripcion: 'Área de cafetería para preescolar con control de acompañamiento.', intensidad: 1 },
];

@Component({
  selector: 'app-reporte',
  imports: [CommonModule, FormsModule, GlassCard],
  templateUrl: './reporte.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reporte {
  constructor(private router: Router) {}
  zonas = ZONAS_VIGILANCIA;

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
  toasts = signal<Array<{ id: number; title: string; message: string; tone: string }>>([]);
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
    const zona = this.zonas.find(item => item.id === this.zonaSeleccionada())?.nombre ?? 'Sin zona';
    const tipo = this.tiposIncidente.find(item => item.id === this.tipoSeleccionado())?.nombre ?? 'Sin tipo';
    const severidad = this.severidades.find(item => item.codigo === this.severidadSeleccionada())?.nombre ?? 'Sin severidad';
    const destinatarios = this.departamentos
      .filter(dep => this.departamentosSeleccionados().has(dep.id))
      .map(dep => dep.nombre);

    const alertas = [
      {
        title: 'Incidente registrado',
        message: `${tipo} en ${zona} con severidad ${severidad}.`,
        tone: 'border-l-4 border-emerald-400',
      },
      {
        title: 'Notificaciones enviadas',
        message: destinatarios.length > 0
          ? `Correo enviado a: ${destinatarios.join(', ')}.`
          : 'No se seleccionaron destinatarios para notificar.',
        tone: 'border-l-4 border-sky-400',
      },
    ];

    this.toasts.set(alertas.map(item => ({ id: ++this.toastId, ...item })));

    window.setTimeout(() => {
      this.toasts.set([]);
      void this.router.navigate(['/profesor/home']);
    }, 1800);
  }
}
