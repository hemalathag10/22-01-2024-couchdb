// book-list.component.ts

import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { HttpHeaders } from '@angular/common/http';

interface book {
  _id: string;
  _rev: string;
  title: string;
  content: string;
  type:string;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './show-list.component.html',
})
export class ShowListComponent implements OnInit {
  books: book[] = [];
  editingbookId: string | null = null;
  editedbook: book | null = null; // Track the book being edited

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadbooks();
  }


  // Assuming these properties are part of your component
  pageNumber: number = 1; // Default to the first page
  pageSize: number = 3; // Number of books to fetch per page
  
  // Function to load books for the current page
  loadbooks() {
    this.blogService.getAllbooks(this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        this.books = response.docs;
        // Additional code as needed
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  
  // Function to navigate to the next page
  nextPage() {
    this.pageNumber++;
    this.loadbooks();
  }
  
  // Function to navigate to the previous page
  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadbooks();
    }
  }



  load_books() {
    this.blogService.getAll_books().subscribe(
      (response: any) => {
        this.books = response.rows.map((row: any) => row.value) as book[];
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  



 
  updateEditedTitle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.editedbook) {
      this.editedbook = { ...this.editedbook, title: inputElement.value };
    }
  }

  updateEditedContent(event: Event) {
    const textareaElement = event.target as HTMLTextAreaElement;
    if (this.editedbook) {
      this.editedbook = { ...this.editedbook, content: textareaElement.value };
    }
  }

  updateEditedType(event: Event) {
    const input_Element = event.target as HTMLInputElement;
    if (this.editedbook) {
      this.editedbook = { ...this.editedbook, type: input_Element.value };
    }
  }
  

  editbook(bookId: string) {
    // Set the editingbookId and load the book data for editing
    this.editingbookId = bookId;
    this.editedbook = { ...this.books.find(book => book._id === bookId)! };
  }

  cancelEdit() {
    // Clear the editingbookId and reset editedbook
    this.editingbookId = null;
    this.editedbook = null;
  }

  saveEditedbook(bookId: string) {
    if (this.editedbook) {
      const credentials = 'admin:admin';
      const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(credentials) });

      // Update the book on the server
      this.blogService.updatebook(bookId, this.editedbook, headers).subscribe(
        (response) => {
          console.log('book updated successfully:', response);

          // Optionally, update the local books array to reflect changes
          const updatedIndex = this.books.findIndex(book => book._id === bookId);
          if (updatedIndex !== -1) {
            this.books[updatedIndex] = { ...this.editedbook! };
          }

          // Clear the editingbookId and reset editedbook
          this.editingbookId = null;
          this.editedbook = null;
        },
        (error) => {
          console.error('Error updating book:', error);
          // Handle error (show error message, log, etc.)
        }
      );
    }
  }


  deletebook(bookId: string, rev: string) {
    const credentials = 'admin:admin';
    const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(credentials) });

    this.blogService.deletebook(bookId, rev, headers).subscribe(
      (response) => {
        console.log('book deleted successfully:', response);

        // Optionally, update the local books array to reflect the deletion
        this.books = this.books.filter((book) => book._id !== bookId);

        // Clear the editingbookId and reset editedbook
        this.editingbookId = null;
        this.editedbook = null;
      },
      (error) => {
        console.error('Error deleting book:', error);
        // Handle error (show error message, log, etc.)
      }
    );
  }
}
