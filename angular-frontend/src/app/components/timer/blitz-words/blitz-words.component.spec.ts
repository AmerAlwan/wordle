import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlitzWordsComponent } from './blitz-words.component';

describe('BlitzWordsComponent', () => {
  let component: BlitzWordsComponent;
  let fixture: ComponentFixture<BlitzWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlitzWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlitzWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
