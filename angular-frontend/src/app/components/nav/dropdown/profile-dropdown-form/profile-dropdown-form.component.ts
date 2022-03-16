import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown-form',
  templateUrl: './profile-dropdown-form.component.html',
  styleUrls: ['./profile-dropdown-form.component.css']
})
export class ProfileDropdownFormComponent implements OnInit {
  @Input() showRegister: boolean = false;
  @Input() showLogin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.showRegister = false ? true : false;
  }

}
