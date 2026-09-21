import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-client',
  standalone: true,
  styleUrl: './create-client.css',
  templateUrl: './create-client.html',
})
export class ClientComponent implements OnInit{
  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);
  
  //Lista de Datos
  client: Client[] = [];
  deleteClient: Client[] = [];

  //Estado del formulario y vista
  isEditing = false;
  showDeleted = false;
  errorMessage = '';
   
  //Formulario
  clientForm = this.fb.group({
  dni: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
  name: ['', [Validators.required, Validators.maxLength(10)]],
  surname: ['', [Validators.required, Validators.maxLength(10)]],
  email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
  phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
 });

 ngOnInit(): void {
   this.loadAllData();
 }

 loadAllData(): void {
  this.loadClients();
  this.loadDeleteClient();
 }

 loadClients(): void {
  this.clientService.getClient().subscribe({
    next: (data) => (this.client = data),
    error: (err) => {
      console.error('Error al cargar el Cliente', err);
      this.errorMessage = 'Error al obtener la lista de Clientes activos'; 
    }
  });
 }

 loadDeleteClient(): void {
  this.clientService.getClient().subscribe({
    next: (data) => (this.client = data),
    error: (err) => {
      console.error('Error al cargar los Clientes eliminados', err);
    }
  });
 }

 onSubmit(): void {
  if (this.clientForm.invalid) return;
  const clientData = this.clientForm.getRawValue() as Client;
  if (this.isEditing){
    this.clientService.updateClient(clientData).subscribe({
      next:() => {
        this.loadAllData();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al actualizar Cliente', err);
        this.errorMessage = 'No se pudo actualizar el Cliente'
      }
    });
  } else {
    this.clientService.createClient(clientData).subscribe({
      next:() => {
        this.loadAllData();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro al crear el Cliente', err);
        this.errorMessage = 'No se crear el Cliente'
      }
    });
  }
 }

 editClient(client: Client): void {
  this.isEditing = true;
  this.clientForm.patchValue(client);
  this.clientForm.controls.dni.disable();
 }

 deletedClient(dni: string): void {
  if (confirm(`Estas Seguro que se elimina el Cliente con Dni: ${dni}?`)){
    this.clientService.deletedClient(dni).subscribe({
      next: () => this.loadAllData(), 
      error: (err) => console.error('Error al eliminar', err)
    });
  }
 }

 resetForm(): void {
  this.isEditing = false;
  this.clientForm.reset();
  this.clientForm.controls.dni.enable();
  this.errorMessage = '';
 }

}
