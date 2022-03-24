import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeydownService } from '../../../../services/keydown/keydown.service';
import { UserService } from '../../../../services/user/user.service';


@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css'],
  animations: [
    trigger('extendButton', [
      state('extend', style({
        width: '300px'
      })),
      transition('retreat => extend', [
        animate('0.2s')
      ]),
      transition('extend => retreat', [
        animate('0.2s 0.3s')
      ])
    ]),
    trigger('revealMenu', [
      state('extend', style({
        opacity: 1,
      })),
      state('retreat', style({
        opacity: 0,
        height: 0
      })),
      transition('retreat <=> extend', [
        animate('0.3s 0.3s ease-in-out')
      ])
    ])
  ]
})


export class ProfileDropdownComponent implements OnInit, AfterViewInit {
  username: string;
  isDropdownOpen: boolean = false;
  isLoggedIn: boolean = false;
  keydownService: KeydownService;
  userService: UserService;

  constructor(private renderer: Renderer2, keydownService: KeydownService, userService: UserService) {
    this.keydownService = keydownService;
    this.userService = userService;
    this.username = this.userService.getUsername();
  }

  ngOnInit(): void {
    this.userService.watchUser().subscribe(user => {
      this.username = user.username;
    })
  }

  ngAfterViewInit() {
  
  }

  setIsDropdownOpen(open: boolean) {
    this.isDropdownOpen = open;
    this.isLoggedIn = this.userService.getIsLoggedIn();
    if (this.isDropdownOpen) this.keydownService.disableKeydown();
    else this.keydownService.enableKeydown();
  }

}

