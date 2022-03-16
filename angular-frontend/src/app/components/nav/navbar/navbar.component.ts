import { Component, Input, OnInit } from '@angular/core';
import { NgbNav, NgbNavItem, NgbNavLink  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showRegister: boolean = false;
  @Input() showLogin: boolean = false;
  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
