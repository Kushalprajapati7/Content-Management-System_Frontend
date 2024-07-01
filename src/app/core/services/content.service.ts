import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IContent } from '../interfaces/contentInterface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private apiUrl = 'http://localhost:3000/api/content'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addContent(contentData: IContent): Observable<IContent> {
    return this.http.post<IContent>(`${this.apiUrl}/add`, contentData)
  }

  showAllContent(): Observable<IContent[]> {
    return this.http.get<IContent[]>(`${this.apiUrl}/`)
  }

  getContentById(id: string): Observable<IContent> {
    return this.http.get<IContent>(`${this.apiUrl}/${id}`)
  }

  deleteContent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateContent(id:string,contentData: IContent): Observable<IContent> {
    return this.http.put<IContent>(`${this.apiUrl}/${id}`, contentData)
  }
}
