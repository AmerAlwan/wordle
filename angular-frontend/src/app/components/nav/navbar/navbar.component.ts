import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGear, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showRegister: boolean = false;
  @Input() showLogin: boolean = false;
  @Output() displaySettingsEmitter = new EventEmitter<boolean>();
  @Output() displayGameInfoEmitter = new EventEmitter<boolean>();
  isMobileDevice: boolean = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isCollapsed: boolean = false;
  faGear = faGear as IconProp
  faCircleInfo = faCircleInfo as IconProp

  constructor() { }

  ngOnInit(): void {
  }

  displaySettings() {
    this.displaySettingsEmitter.emit(true);
  }

  displayGameInfo() {
    this.displayGameInfoEmitter.emit(true);
  }

}
