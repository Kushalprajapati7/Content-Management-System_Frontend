import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAddEditComponent } from './media-add-edit.component';

describe('MediaAddEditComponent', () => {
  let component: MediaAddEditComponent;
  let fixture: ComponentFixture<MediaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaAddEditComponent]
    });
    fixture = TestBed.createComponent(MediaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
