import { Component, OnInit } from '@angular/core';
import { IMedia } from 'src/app/core/interfaces/mediaInterface';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/core/services/media.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
  medias: IMedia[] = [];
  canAdd: boolean = false;
  constructor(
    private mediaService: MediaService,
    private sanitizer: DomSanitizer
    , private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.loadMedias();

    
    const role = this.authService.getRole();
    this.canAdd= role === 'admin' || role ==='editor';

  }

  loadMedias(): void {
    this.mediaService.showAllMedia().subscribe(
      (data: IMedia[]) => {
        this.medias = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }

  viewDetails(id: string): void {
    this.router.navigate(['media/mediaDetails', id]);
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

  goToAddMedia(){
    this.router.navigate(['media/add-media']); 
  }

}
