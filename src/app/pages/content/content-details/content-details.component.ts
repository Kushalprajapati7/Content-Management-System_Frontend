import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { ContentService } from 'src/app/core/services/content.service';

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
    private router: Router
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
      },
      (error) => {
        console.error(error);
      }
    )
  }

  updateContent(content: IContent): void {
    this.router.navigate(['content/edit-content', content._id]);
  }

  deleteContent(content: IContent): void {
    if (!content._id) {
      return
    }
    this.contentService.deleteContent(content._id).subscribe(
      (respose) => {
        this.router.navigate(['content/all-content']);
      },
      (error) => {
        console.log(error);

      }
    )

  }
}
