import { Component, OnInit } from '@angular/core';
import { IMedia } from 'src/app/core/interfaces/mediaInterface';
import { MediaService } from 'src/app/core/services/media.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit {
  media: any;
  canEdit: boolean = false;
  canDelete: boolean = false;
  constructor(
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mediaId = params['id'];
      this.loadMediaDetails(mediaId);
    });

    const role = this.authService.getRole();
    this.canEdit = role === 'admin' || role === 'editor';
    this.canDelete = role === 'admin';

  }

  loadMediaDetails(mediaId: string) {
    this.mediaService.getMediaById(mediaId).subscribe(
      (data: IMedia) => {
        this.media = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSafeUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/${path}`);
  }

  deleteMedia(media: IMedia) {
    const mediaId = media._id;
    this.mediaService.deleteMedia(mediaId).subscribe(
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Media Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['media/all-media'])
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateMedia(contant: any) {
    this.router.navigate(['media/edit-media', contant._id]);
  }

}
