// blog.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:5984/demo'; // Update with your CouchDB base URL

  constructor(private http: HttpClient) {}

  createbook(book: any, headers?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}`; // Update with your actual API endpoint
    return this.http.post(url, book, { headers });
  }



  private credentials = 'admin:admin';


  getAll_books(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });

    return this.http.get<any>(`${this.baseUrl}/_design/blog/_view/books`, { headers });
  }


  getAllbooks(pageNumber: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  
    const mangoQuery = {
      selector: {
        type: 'post'
      },
      fields: ['_id', '_rev', 'title', 'content'],
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      sort: [{ title: 'asc' }],
      use_index: 'by_title'
    };
  
    return this.http.post<any>(`${this.baseUrl}/_find`, mangoQuery, { headers });
  }
  




  getbookById(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/demo/${bookId}`);
  }
  

  updatebook(bookId: string, bookData: any, headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${bookId}`;
    return this.http.put(url, bookData, { headers });
  }

  deletebook(bookId: string, rev: string, headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${bookId}?rev=${rev}`; // Update with your actual API endpoint
    return this.http.delete(url, { headers });
  }

  searchBooksByTitle(title: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
    const mangoQuery = {
      "selector": {
        "title": {
          "$regex": `^(?i)${title}$` // Case-insensitive regex
        } 

          },
          "fields": ["_id", "_rev", "title", "content", "author", "published_date"],
      "use_index": "by_title" 
    };

    return this.http.post<any>(`${this.baseUrl}/_find`, mangoQuery,{headers});


  }

}
