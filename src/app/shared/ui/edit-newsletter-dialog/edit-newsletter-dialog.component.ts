import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core'
import { NgIf, UpperCasePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Newsletter } from 'src/app/features/admin/shared/admin.interfaces'
import { emailValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { getErrorMessage } from '@shared/form-errors/form.errors'

export interface DialogData {
  newsletter$: Observable<Newsletter>;
}

@Component({
  selector: 'app-edit-newsletter-dialog',
  standalone: true,
  templateUrl: 'edit-newsletter-dialog.component.html',
  styleUrls: ['edit-newsletter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    UpperCasePipe,
    TranslateModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ]
})
export class EditNewsletterDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef);
  private formBuilder = inject(NonNullableFormBuilder)

  updateEmailForm = this.createUpdateEmailForm()

  ngOnInit() {
    this.data.newsletter$.subscribe((data) => {
      this.updateEmailForm.patchValue({
        email: data.email
      })
    })
  }

  errorMessage(formControlName: 'email') {
    return getErrorMessage(formControlName, this.updateEmailForm)
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.updateEmailForm.getRawValue());
  }

  private createUpdateEmailForm() {
    return this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.maxLength(100), whitespaceValidator, emailValidator])
    })
  }
}
