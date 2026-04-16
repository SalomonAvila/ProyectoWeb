import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlassCard } from '../../../../shared/ui/glass-card/glass-card';

@Component({
  selector: 'app-reporte',
  imports: [GlassCard],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reporte {}
