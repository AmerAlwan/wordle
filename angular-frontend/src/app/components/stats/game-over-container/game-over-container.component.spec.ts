import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverContainerComponent } from './game-over-container.component';

describe('GameOverContainerComponent', () => {
  let component: GameOverContainerComponent;
  let fixture: ComponentFixture<GameOverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameOverContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
