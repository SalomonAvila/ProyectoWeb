import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, Subject, of, map, catchError, takeUntil, shareReplay } from 'rxjs';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { TurnoService } from '../../../../core/services/turno.service';
import { MetricasService } from '../../../../core/services/metricas.service';
import { NotificacionService } from '../../../../core/services/notificacion.service';

/* ── Fallbacks para cuando el backend no responde ── */
const USUARIO_FALLBACK    = { nombre: 'Usuario' };
const METRICAS_FALLBACK   = { puntos_totales: 0, ranking: 1, puntualidad_porcentaje: 0, recorridos_promedio: 0 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class Home implements OnDestroy {

  usuario$!:              Observable<any>;
  unreadCount$!:          Observable<number>;
  turnosDisponibles$!:    Observable<any[]>;
  proximosTurnos$!:       Observable<any[]>;
  turnosCompletadosHoy$!: Observable<any[]>;
  metricas$!:             Observable<any>;

  private destroy$ = new Subject<void>();

  constructor(
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private metricasService: MetricasService,
    private notificacionService: NotificacionService,
    private router: Router
  ) {
    /* ── Usuario ── */
    this.usuario$ = this.usuarioService.getUsuarioActual().pipe(
      catchError(() => of(USUARIO_FALLBACK))
    );

    /* ── Notificaciones no leídas ── */
    this.unreadCount$ = this.notificacionService.getNotificaciones().pipe(
      map((n: any[]) => n.filter(notif => !notif.leida).length),
      catchError(() => of(0))
    );

    /* ── Turnos (compartido para evitar múltiples peticiones) ── */
    const turnos$ = this.turnoService.getTurnos().pipe(
      catchError(() => of([])),
      shareReplay(1)
    );

    /* DISPONIBLES */
    this.turnosDisponibles$ = turnos$.pipe(
      map((turnos: any[]) => turnos.filter(t => t.estado === 'DISPONIBLE'))
    );

    /* PRÓXIMOS */
    this.proximosTurnos$ = turnos$.pipe(
      map((turnos: any[]) => turnos.filter(t => t.estado === 'ASIGNADO'))
    );

    /* COMPLETADOS HOY */
    this.turnosCompletadosHoy$ = turnos$.pipe(
      map((turnos: any[]) => {
        const hoy = new Date().toISOString().split('T')[0];
        return turnos.filter(t =>
          t.estado === 'COMPLETADO' && t.fecha?.startsWith(hoy)
        );
      })
    );

    /* ── Métricas — siempre emite algo ── */
    this.metricas$ = this.metricasService.getMetricasDocente().pipe(
      catchError(() => of(METRICAS_FALLBACK)),
      map(m => m ?? METRICAS_FALLBACK)
    );
  }

  tomarTurno(turno: any): void {
    this.turnoService.tomarTurno(turno.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ error: err => console.error('Error al tomar turno:', err) });
  }

  noAsistir(turno: any): void {
    this.turnoService.reasignarTurno(turno.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ error: err => console.error('Error al reasignar turno:', err) });
  }

  mostrarNotificaciones = false;
  mostrarRanking = false;

  cerrarSesion(): void {
    this.usuarioService.logout?.();
    this.router.navigate(['/']);
  }

  calcularEstrellas(metricas: any): number {
    if (!metricas) return 0;
    const puntualidad = metricas.puntualidad_porcentaje ?? 0;
    const recorridos  = metricas.recorridos_promedio   ?? 0;
    const score       = (puntualidad + recorridos) / 2;
    return Math.min(5, Math.max(0, Math.round(score / 20)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}