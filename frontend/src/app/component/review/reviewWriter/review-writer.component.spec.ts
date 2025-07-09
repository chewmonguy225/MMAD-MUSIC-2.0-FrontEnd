import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWriter } from './review-writer.component';

describe('ReviewComponent', () => {
  let component: ReviewWriter;
  let fixture: ComponentFixture<ReviewWriter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewWriter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewWriter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
