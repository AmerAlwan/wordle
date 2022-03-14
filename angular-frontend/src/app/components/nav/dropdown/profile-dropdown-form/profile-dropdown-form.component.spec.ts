import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDropdownFormComponent } from './profile-dropdown-form.component';

describe('ProfileDropdownFormComponent', () => {
  let component: ProfileDropdownFormComponent;
  let fixture: ComponentFixture<ProfileDropdownFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDropdownFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDropdownFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
