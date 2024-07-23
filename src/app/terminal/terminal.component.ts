import { Component } from '@angular/core';
import { NeofetchComponent } from "./neofetch/neofetch.component";
import { PromptComponent } from "./prompt/prompt.component";
import { FileSystemService } from './prompt/folders/folders.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NeofetchComponent, PromptComponent],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent {
  constructor(public folderservice: FileSystemService) {}
}
