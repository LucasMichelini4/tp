import { Component, } from '@angular/core';
import { CreateTurnComponent } from './components/create-turn/create-turn.component.js';

@Component({
  imports: [CreateTurnComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  template: '<app-create-turn></app-create-turn>',
})
export class App {

}
