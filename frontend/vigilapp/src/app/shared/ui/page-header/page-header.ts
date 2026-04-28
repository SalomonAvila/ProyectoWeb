import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showBack: boolean = false;
  @Input() backPath: string = '/administrator/home';

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate([this.backPath]);
  }
}
