import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameType } from '../../models/name-type.model';

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
    this.loadDeletedNameType();
  }

  loadNameType(): void {
    this.NameTypeService.getNameType().subscribe({
      next: (data) => (this.nameType = data),
      error: (err) => {
        console.error('Error al cargar un Nombre', err);
        this.errorMessage = 'Error al obtener la lista de Nombre activos';
      }
    });
  }

  loadDeleteNameType(): void {
    this.NameTypeService.getNameType().subscribe({
      next: (data) => (this.nameType = data,)
      error: (err) => {
        console.error('Error al cargar los Nombres eliminados', err);
      }
    });
  }

  onSubmit(): void {
    if (this.nameTypeForm.invalid) return;
    const nameTypeData = this.nameTypeForm.getRawValue() as NameType;
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
    this.nameTypeForm.patchValue(nameType);
    this.nameTypeForm.controls.id.disable();
  }

  deletedNameType(id: number): void {
    if (confirm(`Estas seguro que se elimina el Nombre con id: ${id}?`)) {
      this.NameTypeService.deletedNameType(id).subscribe({
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

  reserForm(): void {
    this.isEditing = false;
    this.nameTypeForm.reset();
    this.nameTypeForm.controls.id.enable();
    this.errorMessage = '';
  }
}
