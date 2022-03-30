import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoContentComponent } from './game-info-content.component';

describe('GameInfoContentComponent', () => {
  let component: GameInfoContentComponent;
  let fixture: ComponentFixture<GameInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInfoContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
