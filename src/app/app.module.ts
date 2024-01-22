// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShowListComponent } from './book/show-list.component';
import { AddBookComponent } from './book/add-book.component';
import { BookService } from './book.service';
import { BookSearchComponent } from './book/book-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowListComponent,
    AddBookComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
