import { Component, OnInit } from '@angular/core';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { ContentService } from 'src/app/core/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  content: any;
  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router:Router

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const contentId = params['id'];
      this.loadContentDetails(contentId);
    });

  }

  loadContentDetails(contentId: string) {
    this.contentService.getContentById(contentId).subscribe(
      (data: IContent) => {
        this.content = data;
        console.log(this.content);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }

  deleteContent(content: any) {
    // console.log(content,"Dele");
    const contentId = content._id;
    this.contentService.deleteContent(contentId).subscribe(
      (response) => {
        console.log("Content Deleted SuccessFully", response);
        this.router.navigate(['content/all-content'])
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateContent(contant:any){
    console.log(contant,"edit");
    this.router.navigate(['content/edit-content', contant._id]);
  }

}
