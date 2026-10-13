import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameType } from '../../models/name-type.model';
import { NameTypeService } from '../../services/name-type.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-name-type',
  standalone: true,
  styleUrl: './name-type.css',
  templateUrl: './name-type.html',
})
export class NameTypeComponent implements OnInit{
  private NameTypeService = inject(NameTypeService);
  private fb = inject(FormBuilder);

  //Lista de Nombre
  nameType: NameType[] = [];
  deleteNameType: NameType[] = [];

  //Estado del formulario y vista
  isEditing = false;
  showDeleted = false;
  errorMessage = '';

  //Formulario
  nameTypeForm = this.fb.group({
    id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    price: [0, [Validators.required, Validators.min(0)]],
    duration: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadNameType();
    this.loadDeleteNameType();
  }

  loadNameType(): void {
    this.NameTypeService.getNameTypes().subscribe({
      next: (data) => (this.nameType = data),
      error: (err) => {
        console.error('Error al cargar un Nombre', err);
        this.errorMessage = 'Error al obtener la lista de Nombre activos';
      }
    });
  }

  loadDeleteNameType(): void {
    this.NameTypeService.getNameTypes().subscribe({
      next: (data) => (this.nameType = data),
      error: (err) => {
        console.error('Error al cargar los Nombres eliminados', err);
      }
    });
  }

  onSubmit(): void {
    if (this.nameTypeForm.invalid) return;
    const rawValues = this.nameTypeForm.getRawValue();
    const nameTypeData: NameType = {
      id: rawValues.id ? Number(rawValues.id) : 0,
      description: rawValues.description ?? '',
      price: rawValues.price ? Number(rawValues.price) : 0,
      duration: rawValues.duration ? Number(rawValues.duration) : 0,
    }
    if (this.isEditing) {
      this.NameTypeService.updateNameType(nameTypeData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar Nombre', err);
          this.errorMessage = 'No se pudo actualizar el Nombre'
        }
      });
    } else {
      this.NameTypeService.createNameType(nameTypeData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear el Nombre', err);
          this.errorMessage = 'No se crea el Nombre'
        }
      });
    }
  }

  editNameType(nameType: NameType): void {
    this.isEditing = true;
    this.nameTypeForm.patchValue(nameType as any);
    this.nameTypeForm.controls.id.disable();
  }

  deletedNameType(id: number): void {
    if (confirm(`Estas seguro que se elimina el Nombre con id: ${id}?`)) {
      this.NameTypeService.deleteNameType(id).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  restoreNameType(id: number): void {
    this.NameTypeService.restoreNameType(id).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.error('Error al restaurar el Nombre', err)
    });
  }

  toggleView(showDeletedList: boolean): void {
    this.showDeleted = showDeletedList;
  }

  resetForm(): void {
    this.isEditing = false;
    this.nameTypeForm.reset();
    this.nameTypeForm.controls.id.enable();
    this.errorMessage = '';
  }
}
