import { Component, Input } from '@angular/core';
import { PromptOutput } from './output.model';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {
  @Input({required: true}) terminal_output!: PromptOutput[];
}
