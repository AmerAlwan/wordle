import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css'],
  animations: [
    trigger('extendButton', [
      state('extend', style({
        width: '300px'
      })),
      transition('retreat <=> extend', [
        animate('0.2s')
      ])
    ]),
  ]
})


export class ProfileDropdownComponent implements OnInit {
  username: string = "Anonymous";
  isDropdownOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setIsDropdownOpen(open: boolean) {
    this.isDropdownOpen = open;
  }

}

