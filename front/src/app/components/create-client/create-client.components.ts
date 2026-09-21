import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  dni:
  name: 
  surname: 
  email: 
  phone: 
})
}
