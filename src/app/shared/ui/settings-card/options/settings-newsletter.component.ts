import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatButtonModule } from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-settings-newsletter',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>Edytuj zgody</h2>
      <form [formGroup]="newsletterForm" (ngSubmit)="updateNewsletter()">
        <mat-slide-toggle formControlName="newsletter">Zgoda na otrzymywanie newslettera</mat-slide-toggle>
        <div class="button-wrapper">
          <button mat-raised-button color="primary">Zapisz</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .general-form-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      gap: 12px;
    }

    h2 {
      margin-bottom: 36px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
    }

    .button-wrapper {
      margin-top: 24px;
      width: 200px;
    }

    button {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNewsletterComponent implements OnInit {
  @Input() newsletter$!: Observable<boolean>

  private formBuilder = inject(NonNullableFormBuilder)

  newsletterForm = this.createNewsletterForm()

  ngOnInit() {
    this.newsletter$.subscribe(newsletter => {
      this.newsletterForm.patchValue({ newsletter })
    })
  }

  updateNewsletter() {
    console.log(this.newsletterForm.getRawValue())
  }

  private createNewsletterForm() {
    return this.formBuilder.group({
      newsletter: this.formBuilder.control(false)
    })
  }
}
