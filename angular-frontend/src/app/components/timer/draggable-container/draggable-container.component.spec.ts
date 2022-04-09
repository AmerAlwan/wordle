import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableContainerComponent } from './draggable-container.component';

describe('DraggableContainerComponent', () => {
  let component: DraggableContainerComponent;
  let fixture: ComponentFixture<DraggableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
