import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentList: IContent[] = [];
  canAdd: boolean = false;
  constructor(
    private contentService: ContentService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadContents()
    const role = this.authService.getRole();
    this.canAdd = role === 'admin' || role === 'editor';
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

  viewDetails(contentId: any) {
    this.router.navigate(['content/contentDetails', contentId]);
  }

}
