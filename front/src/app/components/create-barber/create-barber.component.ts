import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarberService } from '../../services/barber.service.js';
import { Barber } from '../../models/barber.model.js';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-barber',
  standalone: true,
  styleUrl: './create-barber.css',
  templateUrl: './create-barber.html',
})
export class BarberComponent implements OnInit {
  private barberService = inject(BarberService);
  private fb = inject(FormBuilder);

  barber: Barber[] = [];
  deleteBarber: Barber[] = [];

  isEditing = false;
  showDeleted = false;
  errorMessage = '';

  barberForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
    name: ['', [Validators.required, Validators.maxLength(10)]],
  });

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadBarbers();
    this.loadDeletedBarber();
  }

  loadBarbers(): void {
    this.barberService.getBarber().subscribe({
      next: (data) => (this.barber = data),
      error: (err) => {
        console.error('Error al cargar el peluquero', err);
        this.errorMessage = 'Error al obtener la lista de peluqueros activos';
      }
    });
  }

  loadDeletedBarber(): void {
    this.barberService.getBarber().subscribe({
      next: (data) => (this.barber = data),
      error: (err) => {
        console.error('Error al cargar los peluqueros eliminados', err)
      }
    })
  }

  onSubmit(): void {
    if (this.barberForm.invalid) return;
    const barberData = this.barberForm.getRawValue() as Barber;
    if (this.isEditing) {
      this.barberService.updateBarber(barberData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar peluquero', err)
          this.errorMessage = 'No se pudo actualizar peluquero'
        }
      });
    } else {
      this.barberService.createBarber(barberData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear el peluquero', err);
          this.errorMessage = 'No se pudo crear el peluquero'
        }
      });
    }
  }

  editBarber(barber: Barber): void {
    this.isEditing = true;
    this.barberForm.patchValue(barber);
    this.barberForm.controls.dni.disable();
  }

  deletBarber(dni: string): void {
    if (confirm(`Estas seguro que quieres eliminar el peluquero con dni: ${dni}?`)) {
      this.barberService.deletedBarber(dni).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.error('Error al eliminar el peluquero', err)
      });
    }
  }

  restoreBarber(dni: string): void {
    this.barberService.restoreBarber(dni).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.error('Error al restaurar el peluquero', err)
    });
  }

  toggleView(showDeletedList: boolean): void {
    this.showDeleted = showDeletedList;
  }

  resetForm(): void {
    this.isEditing = false;
    this.barberForm.reset();
    this.barberForm.controls.dni.enable();
    this.errorMessage = '';
  }
}

