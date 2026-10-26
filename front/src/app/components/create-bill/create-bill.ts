import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-create-bill',
  standalone: true,
  styleUrl: './create-bill.css',
  templateUrl: './create-bill.html',
})
export class CreateBill {
}
