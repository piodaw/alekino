import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { NgForOf } from '@angular/common'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-side-nav',
  standalone: true,
  template: `
    <mat-sidenav-container class="example-container">
      <mat-sidenav #sidenav [opened]="open" (openedChange)="onOpenChange($event)" mode="side" opened class="example-sidenav"
                   [fixedInViewport]="true">
        Sidenav
      </mat-sidenav>

      <mat-sidenav-content>
      </mat-sidenav-content>
        
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav {
      width: 250px;
      margin-top: var(--header-height);
      z-index: 2000;
      background-color: var(--primary);
      color: var(--text-primary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    RouterLink,
    NgForOf,
    MatSidenavModule
  ]
})

export class SideNavComponent {
  @Input() open!: boolean;
  @Output() openChange = new EventEmitter<boolean>();
  @ViewChild('drawer') drawer!: MatSidenav;

  onOpenChange(isOpen: boolean) {
    this.openChange.emit(isOpen);
  }
}