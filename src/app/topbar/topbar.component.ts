import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  public now: Date = new Date();
  public time: string = ''
  public displayDate: string = ''
  constructor() {
      setInterval(() => {
        this.now = new Date();
        this.time =  this.now.toTimeString()
        this.displayDate = this.now.toDateString()
        this.now.toTimeString()
      }, 1);
  }
}
