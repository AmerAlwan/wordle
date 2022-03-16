import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDropdownInfoComponent } from './profile-dropdown-info.component';

describe('ProfileDropdownInfoComponent', () => {
  let component: ProfileDropdownInfoComponent;
  let fixture: ComponentFixture<ProfileDropdownInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDropdownInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDropdownInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
