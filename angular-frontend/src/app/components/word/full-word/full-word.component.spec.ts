import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWordComponent } from './full-word.component';

describe('FullWordComponent', () => {
  let component: FullWordComponent;
  let fixture: ComponentFixture<FullWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
