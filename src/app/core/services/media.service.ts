import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IMedia } from '../interfaces/mediaInterface';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = 'http://localhost:3000/api/media';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  addMedia(mediaData: IMedia): Observable<IMedia> {
    return this.http.post<IMedia>(`${this.apiUrl}/upload`, mediaData)
  }

  showAllMedia(): Observable<IMedia[]> {
    return this.http.get<IMedia[]>(`${this.apiUrl}/`)
  }

  getMediaById(id: string): Observable<IMedia> {
    return this.http.get<IMedia>(`${this.apiUrl}/${id}`)
  }

  deleteMedia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateMedia(id:string,mediaData: IMedia): Observable<IMedia> {
    return this.http.put<IMedia>(`${this.apiUrl}/${id}`, mediaData)
  }
}
