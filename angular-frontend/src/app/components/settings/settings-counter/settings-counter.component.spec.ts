import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCounterComponent } from './settings-counter.component';

describe('SettingsCounterComponent', () => {
  let component: SettingsCounterComponent;
  let fixture: ComponentFixture<SettingsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
