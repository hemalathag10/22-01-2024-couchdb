// book-search.component.ts
import { Component } from '@angular/core';
import { BookService } from '../book.service';

interface Book {
  _id: string;
  _rev: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
})
export class BookSearchComponent {
    searchedBooks: any[] = [];
    searchTitle: string = '';
    searchMessage: string = '';
  
    constructor(private bookService: BookService) {}
  
    searchBooks() {
      this.bookService.searchBooksByTitle(this.searchTitle).subscribe(
        (response: any) => {
          this.searchedBooks = response.docs;
          console.log(this.searchedBooks)
          if (this.searchedBooks.length === 0) {
            this.searchMessage = 'No books found for the entered title.';
          } else {
            this.searchMessage = '';
          }
        },
        (error) => {
          console.error('Error searching books by title:', error);
        }
      );
    }
  }