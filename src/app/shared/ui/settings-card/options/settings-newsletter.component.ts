import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatButtonModule } from '@angular/material/button'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs'
import { UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-settings-newsletter',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule
  ],
  template: `
    <div class="general-form-wrapper">
      <h2>{{ 'Edytuj zgody' | uppercase | translate }}</h2>
      <form [formGroup]="newsletterForm" (ngSubmit)="updateNewsletter()">
        <mat-slide-toggle formControlName="newsletter">{{ 'Zgoda na otrzymywanie newslettera' | uppercase | translate }}</mat-slide-toggle>
        <div class="button-wrapper">
          <button mat-raised-button color="primary">{{ 'Zapisz' | uppercase | translate }}</button>
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
  @Output() formData = new EventEmitter<{ newsletter: boolean }>()

  private formBuilder = inject(NonNullableFormBuilder)

  newsletterForm = this.createNewsletterForm()

  ngOnInit() {
    this.newsletter$.subscribe(newsletter => {
      this.newsletterForm.patchValue({ newsletter })
    })
  }

  updateNewsletter() {
    this.formData.emit(this.newsletterForm.getRawValue())
  }

  private createNewsletterForm() {
    return this.formBuilder.group({
      newsletter: this.formBuilder.control(false)
    })
  }
}
