import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  @Input() open: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() maxWidth: string = 'max-w-lg';

  @Output() openChange = new EventEmitter<boolean>();

  close(): void {
    this.openChange.emit(false);
  }
}
