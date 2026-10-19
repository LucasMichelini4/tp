import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../models/salon.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-salon',
  standalone: true,
  styleUrl: './create-salon.css',
  templateUrl: './create-salon.html',
})
export class SalonComponent implements OnInit {
  private salonService = inject(SalonService);
  private fb = inject(FormBuilder);

  //Estado del formulario y vista
  isEditing = false;
  showDeleted = false;
  errorMessage = '';

  //Formulario
  salonForm = this.fb.group({
    cuit: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(11)]],
    legalName: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.maxLength(30)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]]
  })

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadSalon();
    this.loadDeleteSalon();
  }

  loadSalon(): void {
    this.salonService.getSalon().subscribe({
      next: (data) => (this.salon = data),
      error: (err) => {
        console.error('Error al cargar el Salon', err);
        this.errorMessage = 'Error al obtener la lista de Salones activos';
      }
    });
  }

  loadDeleteSalon(): void {
    this.salonService.getSalon().subscribe({
      next: (data) => (this.salon = data),
      error: (err) => {
        console.error('Error al cargar los Salones eliminados', err);
      }
    });
  }

  onSubmit(): void {
    if (this.salonForm.invalid) return;
    const salonData = this.salonForm.getRawValue() as Salon;
    if (this.isEditing){
      this.salonService.updateSalon(salonData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar Salon', err);
          this.errorMessage = 'No se pudo actualizar el Salon'
        }
      });
    } else {
      this.salonService.createSalon(salonData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear el Salon', err);
          this.errorMessage = 'No se crea el Salon'
        }
      });
    }
  }

  editSalon(salon: Salon): void {
    this.isEditing = true;
    this.salonForm.patchValue(salon);
    this.salonForm.controls.cuit.disable();
  }

  deletedSalon(cuit: string): void {
    if (confirm(`Estas seguro que se elimna el Salon con cuit: ${cuit}?`)) {
      this.salonService.deleteSalon(cuit).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  restoreSalon(cuit: string): void {
    this.salonService.restoreSalon(cuit).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.error('Error al restaurar al Salon', err)
    });
  }

  toggleView(showDeletedList: boolean): void {
    this.showDeleted = showDeletedList;
  }

  resetForm(): void {
    this.isEditing = false;
    this.salonForm.reset();
    this.salonForm.controls.cuit.enable();
    this.errorMessage = '';
  }

}
