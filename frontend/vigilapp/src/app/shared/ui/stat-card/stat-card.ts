import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatColor = 'blue' | 'purple' | 'green' | 'orange' | 'yellow' | 'red';
export type StatIcon  = 'map' | 'users' | 'calendar' | 'trending' | 'check' | 'clock' | 'alert' | 'file';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() subtext: string = '';
  @Input() icon: StatIcon = 'map';
  @Input() color: StatColor = 'blue';
  @Input() clickable: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  get bgClass(): string {
    return {
      blue:   'bg-blue-50 hover:bg-blue-100',
      purple: 'bg-purple-50 hover:bg-purple-100',
      green:  'bg-green-50 hover:bg-green-100',
      orange: 'bg-orange-50 hover:bg-orange-100',
      yellow: 'bg-yellow-50 hover:bg-yellow-100',
      red:    'bg-red-50 hover:bg-red-100',
    }[this.color];
  }

  get valueClass(): string {
    return {
      blue:   'text-blue-600',
      purple: 'text-purple-600',
      green:  'text-green-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      red:    'text-red-600',
    }[this.color];
  }

  get subtextClass(): string {
    return {
      blue:   'text-blue-600',
      purple: 'text-purple-600',
      green:  'text-green-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      red:    'text-red-600',
    }[this.color];
  }

  get iconColor(): string {
    return {
      blue:   '#2563eb',
      purple: '#9333ea',
      green:  '#16a34a',
      orange: '#ea580c',
      yellow: '#ca8a04',
      red:    '#dc2626',
    }[this.color];
  }

  onClick(): void {
    if (this.clickable) this.clicked.emit();
  }
}
