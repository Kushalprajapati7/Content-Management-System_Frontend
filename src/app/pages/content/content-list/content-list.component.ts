import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentList:IContent[] =[];
  constructor(
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
this.loadContents()
  }

  loadContents() {
    this.contentService.showAllContent().subscribe(
      (respose) => {
        this.contentList = respose
      },
      (error) => {
        console.log(error);

      }
    )
  }

  viewDetails(contentId:any){
    this.router.navigate(['content/contentDetails', contentId]);
  }

}
