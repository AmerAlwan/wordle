import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoContainerComponent } from './game-info-container.component';

describe('GameInfoContainerComponent', () => {
  let component: GameInfoContainerComponent;
  let fixture: ComponentFixture<GameInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInfoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
