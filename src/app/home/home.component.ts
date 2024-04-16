import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="container" >
      <p>
        nice works, {{ name }}!
      </p>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name = "brian"
}
