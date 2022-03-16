import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneWordErrorComponent } from './none-word-error.component';

describe('NoneWordErrorComponent', () => {
  let component: NoneWordErrorComponent;
  let fixture: ComponentFixture<NoneWordErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoneWordErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneWordErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
