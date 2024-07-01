import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContent } from 'src/app/core/interfaces/contentInterface';
import { ContentService } from 'src/app/core/services/content.service';
import Quill from "quill";


@Component({
  selector: 'app-content-add-edit',
  templateUrl: './content-add-edit.component.html',
  styleUrls: ['./content-add-edit.component.scss']
})
export class ContentAddEditComponent implements OnInit {
  contentForm!: FormGroup;
  contentId: string | null = null;
  isEditing: boolean = false;

  @ViewChild("editorContainer", { static: true })
  editorContainer: ElementRef | null = null;

  editor: Quill | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contentService: ContentService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe(
      params => {
        this.contentId = params.get('id');
        if (this.contentId) {
          this.isEditing = true;
          this.loadContentDetails(this.contentId);

        }
      }
    )

    if (this.editorContainer) {
      try {
        this.editor = new Quill(this.editorContainer.nativeElement, {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          },
          theme: "snow",
        });
      } catch (error) {
        console.error("Error creating Quill editor:", error);
      }
    } else {
      console.error("Element with #editorContainer not found!");
    }

  }

  getEditorContent() {
    if (this.editor) {
      return this.editor.root.innerHTML;
    }
    return "";
  }


  initializeForm() {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      // body: ['', Validators.required],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.contentForm.controls[controlName].touched && this.contentForm.controls[controlName].hasError(errorName);
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

  addContent() {
    if (this.contentForm.invalid) {
      return
    }
    else if (this.editor) {
      const content: any = {
        title: this.contentForm.get('title')?.value,
        body: this.editor.root.innerHTML
      }
      this.contentService.addContent(content).subscribe(
        (response) => {
          this.router.navigate(['content/all-content'])
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  updateContent(){
    if ( this.contentForm.invalid) {
      return
    }else if (this.editor && this.contentId) {
      const content: any = {
        title: this.contentForm.get('title')?.value,
        body: this.editor.root.innerHTML
      }
      this.contentService.updateContent(this.contentId,content).subscribe(
        (response) => {
          this.router.navigate(['content/all-content'])
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  loadContentDetails(contentId: string) {
    this.contentService.getContentById(contentId).subscribe(
      (content: IContent) => {
        this.contentForm.patchValue({
          title: content.title
        });
        if (this.editor) {
          this.editor.root.innerHTML = content.body
        }
      },
      (error) => {
        console.error('Error loading Content details:', error);
      }
    )
  }


}
