import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalComponent } from "./terminal/terminal.component";
import { TopbarComponent } from "./topbar/topbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TerminalComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
}
