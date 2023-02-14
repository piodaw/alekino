import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    TranslateModule
  ],
  template: `
    <form [formGroup]="promoCodeForm" (ngSubmit)="submitPromoCodeForm()">
      <mat-form-field appearance="outline" color="accent">
        <mat-label>{{ 'Kod rabatowy' | uppercase | translate }}</mat-label>
        <input 
          matInput [placeholder]="'Kod rabatowy' | uppercase | translate"
          formControlName="discountCode" 
          (keypress)="isPromoCodeApplied ? $event.preventDefault() : ''"
        />
      </mat-form-field>
      <button mat-raised-button color="accent" type="submit" [disabled]="promoCodeForm.invalid || isPromoCodeApplied">
        {{ 'Zastosuj' | uppercase | translate }}
      </button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      mat-form-field {
        width: 300px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodeComponent {
  @Output() promoCode = new EventEmitter<string>();
  @Input() isPromoCodeApplied = false;
  private formBuilder = inject(NonNullableFormBuilder)

  promoCodeForm = this.createPromoCodeForm()

  submitPromoCodeForm() {
    this.promoCodeForm.markAllAsTouched()

    if (this.isPromoCodeApplied) {
      this.promoCodeForm.disable()
    }

    if (this.promoCodeForm.invalid) {
      return
    }

    this.promoCode.emit(this.promoCodeForm.getRawValue().discountCode)
  }

  private createPromoCodeForm() {
    return this.formBuilder.group({
      discountCode: this.formBuilder.control(''),
    })
  }
}
