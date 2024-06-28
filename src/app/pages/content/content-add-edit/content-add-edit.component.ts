import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IContent } from 'src/app/core/interfaces/contentInterface';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-content-add-edit',
  templateUrl: './content-add-edit.component.html',
  styleUrls: ['./content-add-edit.component.scss']
})
export class ContentAddEditComponent implements OnInit {
  contentForm!: FormGroup;
  selectedFile: File | null = null;
  contentId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contentService: ContentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.contentId = params.get('id');
      if (this.contentId) {
        this.isEditing = true;
        this.loadContentDetails(this.contentId);
      }
    });
  }

  initializeForm() {
    this.contentForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      media: [null, Validators.required]
    });
  }

  submitForm(): void {
    if (this.contentForm.valid) {
      if (this.isEditing) {
        this.updateContent();
      } else {
        this.addContent();
      }
    }
  }

  addContent(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.contentForm.get('title')?.value);
      formData.append('body', this.contentForm.get('body')?.value);
      formData.append('media', this.selectedFile);

      this.contentService.addContent(formData as any).subscribe(
        response => {
          console.log('Content added successfully:', response);
          this.router.navigate(['content/all-content']);
        },
        error => {
          console.error('Error adding content:', error);
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
    return this.contentForm.controls[controlName].touched && this.contentForm.controls[controlName].hasError(errorName);
  }
  updateContent(): void {
    if (this.contentId && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.contentForm.get('title')?.value);
      formData.append('body', this.contentForm.get('body')?.value);

      formData.append('media', this.selectedFile);


      this.contentService.updateContent(this.contentId, formData as any).subscribe(
        response => {
          console.log('Content updated successfully:', response);
          this.router.navigate(['content/all-content']);
        },
        error => {
          console.error('Error updating content:', error);
        }
      );
    }
  }


  loadContentDetails(contentId: string): void {
    this.contentService.getContentById(contentId).subscribe(
      (content: IContent) => {
        this.contentForm.patchValue({
          title: content.title,
          body: content.body,
        });
        this.selectedFile = null;
      },
      error => {
        console.error('Error loading content details:', error);
      }
    );
  }
}

