import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ModuleColor = 'blue' | 'purple' | 'green' | 'orange';

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './module-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleCard {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: 'map' | 'calendar' | 'settings' | 'file' = 'map';
  @Input() color: ModuleColor = 'blue';
  @Input() path: string = '/';
  @Input() badge: string = '';

  get iconBgClass(): string {
    return {
      blue:   'bg-blue-100',
      purple: 'bg-purple-100',
      green:  'bg-green-100',
      orange: 'bg-orange-100',
    }[this.color];
  }

  get badgeClass(): string {
    return {
      blue:   'bg-blue-100 text-blue-700',
      purple: 'bg-purple-100 text-purple-700',
      green:  'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
    }[this.color];
  }

  get iconColor(): string {
    return {
      blue:   '#2563eb',
      purple: '#9333ea',
      green:  '#16a34a',
      orange: '#ea580c',
    }[this.color];
  }
}
