import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})

export class ProfilePageComponent implements OnInit {
  username: string = 'anonymous';
  displayName: string = '';
  isMobileDevice: boolean = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  faAngleDown = faAngleDown as IconProp;
  faAngleUp = faAngleUp as IconProp;
  dailyDrop: boolean = false;
  unlimitedDrop: boolean = false;
  timedDrop: boolean = false;
  blitzDrop: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'].toLowerCase();
      this.displayName = this.username.toUpperCase();
    })
  }

  ngOnInit(): void {
  }

  toggleDaily(): void {
    if (!this.dailyDrop) {
      this.dailyDrop = true;
    }
    else {
      this.dailyDrop = false;
    }
  }

  toggleUnlimited(): void {
    if (!this.unlimitedDrop) {
      this.unlimitedDrop = true;
    }
    else {
      this.unlimitedDrop = false;
    }
  }

  toggleTimed(): void {
    if (!this.timedDrop) {
      this.timedDrop = true;
    }
    else {
      this.timedDrop = false;
    }
  }

  toggleBlitz(): void {
    if (!this.blitzDrop) {
      this.blitzDrop = true;
    }
    else {
      this.blitzDrop = false;
    }
  }

}
