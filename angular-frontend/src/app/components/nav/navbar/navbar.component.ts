import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showRegister: boolean = false;
  @Input() showLogin: boolean = false;
  @Output() displaySettingsEmitter = new EventEmitter<boolean>();
  isMobileDevice: boolean = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isCollapsed: boolean = false;
  faGear=faGear

  constructor() { }

  ngOnInit(): void {
  }

  displaySettings() {
    this.displaySettingsEmitter.emit(true);
  }

}
