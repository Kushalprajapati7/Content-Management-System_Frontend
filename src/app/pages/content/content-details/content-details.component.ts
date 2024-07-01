import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContentService } from 'src/app/core/services/content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  content!: IContent;
  canEdit: boolean = false;
  canDelete: boolean = false;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const contentId = params['id'];
      this.loadContentDetails(contentId);
    });

    const role = this.authService.getRole();
    this.canDelete = role === 'admin';
    this.canEdit = role === 'admin' || role === 'editor';
    console.log(this.canDelete);


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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Content Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['content/all-content']);
      },
      (error) => {
        console.log(error);

      }
    )

  }
}
