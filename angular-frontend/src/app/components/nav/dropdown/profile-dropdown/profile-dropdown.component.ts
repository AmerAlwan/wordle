import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AfterViewInit } from '@angular/core';

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
  username: string = "Anonymous";
  isDropdownOpen: boolean = false;

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  
}

  setIsDropdownOpen(open: boolean) {
    this.isDropdownOpen = open;
  }

}

