import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-service',
  standalone: true,
  styleUrl: './create-service.css',
  templateUrl: './create-service.html',
})

export class ServiceComponent implements OnInit {
  private serviceService = inject(ServiceService);
  private fb = inject(FormBuilder);

  service: Service[] = [];
  deleteService: Service[] = [];

  isEditing = false;
  showDeleted = false;
  errorMessage = '';

  serviceForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(10)]]

  })

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadServices();
    this.loadDeletedServices();
  }

  loadServices(): void {
    this.serviceService.getService().subscribe({
      next: (data) => (this.service = data),
      error: (err) => {
        console.error('Error al cargar el servicio', err);
        this.errorMessage = 'Error al obtener la lista de servicios activos'
      }
    });
  }

  loadDeletedServices(): void {
    this.serviceService.getServiceDeleted().subscribe({
      next: (data) => (this.service = data),
      error: (err) => {
        console.error('Error al cargar los servicios eliminados', err)
      }
    })
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) return;
    const rawValues = this.serviceForm.getRawValue();
    const serviceData: Service = {
      id: rawValues.id ? Number(rawValues.id) : 0,
      name: rawValues.name ?? '',
    }
    if (this.isEditing) {
      this.serviceService.updateService(serviceData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar servicio', err);
          this.errorMessage = 'No se pudo actualizar servicio'
        }
      });
    } else {
      this.serviceService.createService(serviceData).subscribe({
        next: () => {
          this.loadAllData();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al cear el servicio', err);
          this.errorMessage = 'No se creo el servicio'
        }
      })
    }
  }

  editService(service: Service): void {
    this.isEditing = true;
    this.serviceForm.patchValue(service as any);
    this.serviceForm.controls.id.disable();
  }

  deletedService(id: number): void {
    if (confirm(`Estas seguro que se elimina el servicio con id: ${id}?`)) {
      this.serviceService.deletedService(id).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  restoreService(id: number): void {
    this.serviceService.restoreService(id).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.error('Errpr al restaurar el servicio', err)
    });
  }

  toggleView(showDeletedList: boolean): void {
    this.showDeleted = showDeletedList;
  }

  resetForm(): void {
    this.isEditing = false;
    this.serviceForm.reset();
    this.serviceForm.controls.id.enable();
    this.errorMessage = '';
  }
}
