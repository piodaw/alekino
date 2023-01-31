import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/ui/footer/footer'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: [`
    /*:host {*/
    /*  display: flex;*/
    /*  flex-direction: column;*/
    /*  min-height: 100vh;*/
    /*}*/
    
    /*router-outlet {*/
    /*  flex: 1;*/
    /*}*/
    
    /*app-footer {*/
    /*  flex-shrink: 0;*/
    /*}*/
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
