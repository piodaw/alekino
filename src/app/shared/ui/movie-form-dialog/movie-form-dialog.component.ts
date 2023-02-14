import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core'
import { NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Movie } from 'src/app/features/admin/shared/admin.interfaces'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { allowOnlyNumbersValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { getErrorMessage } from '@shared/form-errors/form.errors'

export interface DialogData {
  movie$?: Observable<Movie>;
  isEdit: boolean;
}

@Component({
  selector: 'app-movie-form-dialog',
  standalone: true,
  templateUrl: 'movie-form-dialog.component.html',
  styleUrls: ['movie-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgIf,
    MatListModule,
    UpperCasePipe,
    TranslateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    NgForOf
  ]
})
export class MovieFormDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef);
  private formBuilder = inject(NonNullableFormBuilder)

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  genreChips: string[] = [];
  movieForm = this.createMovieForm()

  ngOnInit() {
    this.data.movie$?.subscribe((movie) => {
      if (movie.genre.length) {
        this.movieForm.patchValue({
          id: movie.id,
          title: movie.title,
          description: movie.description,
          isPremiere: movie.ispremiere,
          genre: movie.genre[0].split(','),
          duration: movie.duration,
          age: movie.age,
          img: movie.img,
          rating: movie.rating
        })
      }
    })
  }

  errorMessage(formControlName: 'title' | 'description' | 'duration' | 'genre' | 'age' | 'img' | 'rating') {
    return getErrorMessage(formControlName, this.movieForm)
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.movieForm.patchValue({
        genre: [...this.movieForm.getRawValue().genre, value]
      })
    }

    event.chipInput!.clear();
  }

  remove(genre: string) {
    const index = this.movieForm.getRawValue().genre.indexOf(genre);

    if (index >= 0) {
      this.movieForm.getRawValue().genre.splice(index, 1);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.movieForm.markAllAsTouched()

    if (this.movieForm.invalid) {
      return;
    }

    this.dialogRef.close(this.movieForm.getRawValue());
  }

  private createMovieForm() {
    return this.formBuilder.group({
      id: this.formBuilder.control(0),
      title: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      description: this.formBuilder.control('', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]),
      isPremiere: this.formBuilder.control(false),
      duration: this.formBuilder.control('', [Validators.required, whitespaceValidator, allowOnlyNumbersValidator, Validators.minLength(2), Validators.maxLength(3)]),
      genre: this.formBuilder.control(this.genreChips, [Validators.required, Validators.minLength(1), whitespaceValidator]),
      age: this.formBuilder.control('', [Validators.required, whitespaceValidator]),
      img: this.formBuilder.control('', [Validators.required, whitespaceValidator]),
      rating: this.formBuilder.control(0, [Validators.required, Validators.min(1), Validators.max(10)]),
    })
  }
}
