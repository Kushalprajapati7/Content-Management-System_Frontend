import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMedia } from 'src/app/core/interfaces/mediaInterface';
import { MediaService } from 'src/app/core/services/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media-add-edit',
  templateUrl: './media-add-edit.component.html',
  styleUrls: ['./media-add-edit.component.scss']
})
export class MediaAddEditComponent implements OnInit {
  mediaForm!: FormGroup;
  selectedFile: File | null = null;
  mediaId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mediaService: MediaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.mediaId = params.get('id');
      if (this.mediaId) {
        this.isEditing = true;
        this.loadMediaDetails(this.mediaId);
      }
    });
  }

  initializeForm() {
    this.mediaForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      media: [null, Validators.required]
    });
  }

  submitForm(): void {
    if (this.mediaForm.valid) {
      if (this.isEditing) {
        this.updateMedia();
      } else {
        this.addMedia();
      }
    }
  }

  addMedia(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.mediaForm.get('title')?.value);
      formData.append('body', this.mediaForm.get('body')?.value);
      formData.append('media', this.selectedFile);

      this.mediaService.addMedia(formData as any).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Media Added Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['media/all-media']);
        },
        error => {
          console.error('Error adding Media:', error);
        }
      );
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.mediaForm.controls[controlName].touched && this.mediaForm.controls[controlName].hasError(errorName);
  }
  updateMedia(): void {
    if (this.mediaId && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.mediaForm.get('title')?.value);
      formData.append('body', this.mediaForm.get('body')?.value);

      formData.append('media', this.selectedFile);


      this.mediaService.updateMedia(this.mediaId, formData as any).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Media Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['media/all-media']);
        },
        error => {
          console.error('Error updating Media:', error);
        }
      );
    }
  }


  loadMediaDetails(mediaId: string): void {
    this.mediaService.getMediaById(mediaId).subscribe(
      (media: IMedia) => {
        this.mediaForm.patchValue({
          title: media.title,
          body: media.body,
        });
        this.selectedFile = null;
      },
      (error) => {
        console.error('Error loading Media details:', error);
      }
    );
  }
}

