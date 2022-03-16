import { Component, OnInit, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-dropdown-form',
  templateUrl: './profile-dropdown-form.component.html',
  styleUrls: ['./profile-dropdown-form.component.css'],
  animations: [
    trigger('revealUsernameField', [
      state('reveal', style({
      })),
      state('hide', style({
        opacity: 0,
        height: 0
      })),
      transition('hide => reveal', [
        animate('0.2s 0.1s')
      ]),
      transition('reveal => hide', [
        style({ opacity: 0 }),
        animate('0.3s 0.1s')
      ])
    ])
  ]
})
export class ProfileDropdownFormComponent implements OnInit {
  @Input() isDropdownOpen: boolean = false;
  isRegisterMode: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  toggleRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

}
