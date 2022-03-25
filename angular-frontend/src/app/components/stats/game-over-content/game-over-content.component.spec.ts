import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverContentComponent } from './game-over-content.component';

describe('GameOverContentComponent', () => {
  let component: GameOverContentComponent;
  let fixture: ComponentFixture<GameOverContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameOverContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
