import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>BOOK STORE</h1>
     <app-book-list></app-book-list>
      <br>
     <app-add-book></app-add-book>
     <br>
     <hr>
     <app-book-search></app-book-search>
    </div>
  `,
  
})
export class AppComponent {
}
