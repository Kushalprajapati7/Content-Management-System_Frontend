import { Component, OnInit } from '@angular/core';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contents: IContent[] = [];

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    this.contentService.showAllContent().subscribe(
      (data: IContent[]) => {
        this.contents = data;
        console.log(this.contents);
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
    this.router.navigate(['content/contentDetails', id]);
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }

}
