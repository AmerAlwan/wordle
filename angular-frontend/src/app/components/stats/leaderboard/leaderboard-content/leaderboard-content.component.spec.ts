import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardContentComponent } from './leaderboard-content.component';

describe('LeaderboardContentComponent', () => {
  let component: LeaderboardContentComponent;
  let fixture: ComponentFixture<LeaderboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
