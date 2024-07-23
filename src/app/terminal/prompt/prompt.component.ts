import { Component, Input } from '@angular/core';
import { Folder } from './folders/folders.models';
import { FileSystemService } from './folders/folders.service';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  @Input({required: true}) fileStructure!: FileSystemService;
}
