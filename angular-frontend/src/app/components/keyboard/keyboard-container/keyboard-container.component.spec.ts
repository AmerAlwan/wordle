import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardContainerComponent } from './keyboard-container.component';

describe('KeyboardContainerComponent', () => {
  let component: KeyboardContainerComponent;
  let fixture: ComponentFixture<KeyboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
