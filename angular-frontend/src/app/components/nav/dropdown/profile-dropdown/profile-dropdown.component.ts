import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})


export class ProfileDropdownComponent implements OnInit {
  @Input() showRegister: boolean = false;
  @Input() showLogin: boolean = false;

  constructor() { }

  registerToggle() {
    this.showRegister = false ? true : false;
  }

  ngOnInit(): void {
  }

}

