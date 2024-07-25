import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileSystemService } from './folders/folders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent{
 
  @Input({required: true}) fileStructure!: FileSystemService;
  @Output() cmd = new EventEmitter<string>();
  argv = '';
  @ViewChild('cmd') promptcmd!: ElementRef;



  onEnter(){
    this.promptcmd.nativeElement.value = ''
    this.cmd.emit(this.argv)
    this.promptcmd.nativeElement.focus()
  }
  onBlur(){
    this.promptcmd.nativeElement.focus()
  }
}
