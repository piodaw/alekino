import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core'
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { Observable } from 'rxjs'

import { Movie } from 'src/app/features/admin/shared/admin.interfaces'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

export interface DialogData {
  movies$: Observable<Movie[]>
}

@Component({
  selector: 'app-repertoire-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>{{ 'Wybierz film w celu utworzenia seansu' | uppercase | translate }}</h1>
    <div class="dialog-wrapper" *ngIf="data.movies$ | async as movies">
      <div mat-dialog-content>
        <form [formGroup]="movieForm" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" color="accent">
            <mat-label>{{ 'Wybierz film' | uppercase | translate }}</mat-label>
            <mat-select formControlName="movieId">
              <mat-option *ngFor="let movie of movies" [value]="movie.id">
                {{ movie.title }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div class="button-wrapper" mat-dialog-actions>
            <button mat-stroked-button color="warn" type="button" (click)="onNoClick()">{{ 'Anuluj' | uppercase | translate }}</button>
            <button mat-raised-button color="primary" type="submit">{{ 'Potwierdź' | uppercase | translate }}</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    mat-form-field {
      margin-bottom: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class RepertoireDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef)
  private formBuilder = inject(NonNullableFormBuilder)
  movieForm = this.movieIdForm()

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close({
      movieId: this.movieForm.getRawValue().movieId
    });
  }

  private movieIdForm() {
    return this.formBuilder.group({
      movieId: [{}, [Validators.required]]
    })
  }
}
