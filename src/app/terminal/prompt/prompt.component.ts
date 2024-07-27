import { Component, ElementRef, EventEmitter, Input,  Output,  ViewChild } from '@angular/core';
import { FileSystemService } from './folders/folders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent  {
 
  @Input({required: true}) fileStructure!: FileSystemService;
  
  @Output() cmd = new EventEmitter<string>();

  @Output() terminalGrow = new EventEmitter<void>()

  argv = '';
  @ViewChild('cmd') promptcmd!: ElementRef;

  cmdList: string[] = ['']


  onEnter(){
    this.promptcmd.nativeElement.value = ''
    this.cmdList.push(this.argv)
    this.cmd.emit(this.argv)
    this.promptcmd.nativeElement.focus()
    setTimeout(() => {
      this.terminalGrow.emit()
    }, 100);
  }

  onUpArrow(){
    if (this.cmdList.length > 0) {
      let lastCMD: string =  this.cmdList.pop() as string;
      this.promptcmd.nativeElement.value = lastCMD.trim()
      this.cmdList.unshift(lastCMD)
    }
   
  }

  onDownArrow(){
    if (this.cmdList.length > 0) {
      let firstCMD: string =  this.cmdList.shift() as string;
      this.promptcmd.nativeElement.value = firstCMD.trim()
      this.cmdList.push(firstCMD)
    }
   
  }

}
