import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { ShowingById } from 'src/app/features/home/shared/home.interfaces';

@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
  ],
  template: `
    {{ showing$ | async | json }}
    <div *ngIf="showing$ | async as showing">
      <div>
        <p>{{ showing.title }}, {{ showing.start.split(' ')[0] }}, godz. {{ showing.start.split(' ')[1] }}</p>
      </div>

      <!-- <div class="screen-wrapper">
        <div class="screen"></div>
        <p>Ekran</p>
      </div> -->
      <div>
        <div *ngFor="let row of showing.rows">
          <div class="rows">{{ row }}</div>
          <div *ngFor="let column of showing.columns">
            {{ column }}
          </div>
        </div>
      </div>
    </div>
    <!-- <form [formGroup]="firstFormGroup">
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
      </mat-form-field>
      <div>
        <p>Go to a different step to see the error state</p>
        <button mat-button matStepperNext>Next</button>
      </div>
    </form> -->
  `,
  styles: [
    `
      .screen-wrapper {
        display: flex;
        flex-direction: column;
      }

      .screen {
        width: 50%;
        height: 50px;
        background-color: #000;
        margin: 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HallComponent {
  @Input() showing$!: Observable<ShowingById>;
  private formBuilder = inject(FormBuilder);

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
}
