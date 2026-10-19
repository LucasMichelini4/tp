import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-barber',
  standalone: true,
  styleUrl: './create-barber.css',
  templateUrl: './create-barber.html',
})
export class CreateBarber { }
