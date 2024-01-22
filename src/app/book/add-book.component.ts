// add-book.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BookService } from '../book.service'; 

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
})
export class AddBookComponent implements OnInit {
  newbook = {
    title: '',
    content: '',
    type:''
    // Add other properties as needed
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  createbook() {
    const credentials = 'admin:admin'; // Update with your CouchDB credentials
    const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(credentials) });

    this.bookService.createbook(this.newbook, headers).subscribe(
      (response) => {
        console.log('book created successfully:', response);
        // Optionally, you can navigate to the book list or perform other actions after successful creation
      },
      (error) => {
        console.error('Error creating book:', error);
        // Handle error (show error message, log, etc.)
      }
    );
  }
}
