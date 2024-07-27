import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NeofetchComponent } from "./neofetch/neofetch.component";
import { PromptComponent } from "./prompt/prompt.component";
import { FileSystemService } from './prompt/folders/folders.service';
import { PromptOutput } from './output/output.model';
import { OutputComponent } from "./output/output.component";




@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NeofetchComponent, PromptComponent, OutputComponent],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent{
  terminal_output: PromptOutput[] = []
  constructor(public folderservice: FileSystemService) {}
  
  @ViewChild('terminal') terminal_div!: ElementRef;

  runCMD(argv: string){
    this.terminal_output.push(
      {
        path: this.folderservice.presentWorkingDirectory()[0],
        cmd: argv,
        output: this.folderservice.runCommand(argv)
      }
    )
   
  }
  scrollDown(){
    this.terminal_div.nativeElement.scrollTop = this.terminal_div.nativeElement.scrollHeight; 
  }


}
