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

  cmdList: string[] = []
  arrowDirection: string = ''
  arrowPressCount = 0

  onEnter(){
    this.arrowPressCount = 0
    this.cmdList.push(this.argv)
    this.cmd.emit(this.argv)
    this.promptcmd.nativeElement.value = ''
    this.promptcmd.nativeElement.focus()
    setTimeout(() => {
      this.terminalGrow.emit()
    }, 100);
  }

  onUpArrow(){
    if (this.arrowDirection != "Up"){
      this.arrowPressCount = 0
      this.arrowDirection = "Up"
    }
    if (this.cmdList.length > 0) {
      this.arrowPressCount += 1
      if (this.arrowPressCount > this.cmdList.length){
        this.argv = ''
        this.arrowPressCount = 0
      }else{
        let lastCMD: string =  this.cmdList.pop() as string;
        this.argv = lastCMD.trim()
        this.cmdList.unshift(lastCMD)
      }
     
    }
   
  }

  onDownArrow(){
    if (this.arrowDirection != "Down"){
      this.arrowPressCount = 0
      this.arrowDirection = "Down"
    }
    if (this.cmdList.length > 0) {
      this.arrowPressCount += 1
      if (this.arrowPressCount > this.cmdList.length){
        this.argv = ''
        this.arrowPressCount = 0
      }else{
        let firstCMD: string =  this.cmdList.shift() as string;
        this.argv = firstCMD.trim()
        this.cmdList.push(firstCMD)
      }
     
    }
   
  }

}
