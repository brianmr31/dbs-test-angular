import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, HomeComponent ],
  // imports: [HomeComponent],
  // templateUrl: './app.component.html',
  template: `
  <main>
    <nav class="navbar navbar-expand-lg container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" [routerLink]="['/home']" >Home <span class="sr-only"> </span> </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" [routerLink]="['/employe']" > <span class="sr-only"> Employe </span></a>
          </li>
        </ul>
      </div>
    </nav>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-ang';
}
