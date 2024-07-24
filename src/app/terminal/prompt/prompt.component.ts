import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from './folders/folders.models';
import { FileSystemService } from './folders/folders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  @Input({required: true}) fileStructure!: FileSystemService;
  @Output() cmd = new EventEmitter<string>();
  argv = '';
  
  onEnter(){
    this.cmd.emit(this.argv)
  }
}
