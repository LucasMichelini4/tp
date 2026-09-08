import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnService } from '../../services/turn.service.js';
import { TurnDto } from '../../models/turn.model.js';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-turn',
  standalone: true,
  styleUrl: './create-turn.css',
  template: './create-turn.html',
})
export class CreateTurnComponent {
  private fb = inject(FormBuilder);
  private turnService = inject(TurnService);

  turnForm = this.fb.group({
    date: ['', Validators.required],
    status: [true, Validators.required]
  });

  onSubmit(): void {
    if (this.turnForm.invalid) {
      this.turnForm.markAllAsTouched();
      return;
    }

    const formValue = this.turnForm.value;

    const payload: TurnDto = {
      date: new Date(formValue.date!).toISOString(),
      status: Boolean(formValue.status)

    };
    this.turnService.createTurn(payload).subscribe({
      next: (res) => {
        alert('Turno guardado con exito!');
        this.turnForm.reset({ status: true })
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el turno!')
      }
    })
  }
}
