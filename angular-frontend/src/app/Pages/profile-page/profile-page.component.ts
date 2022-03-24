import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  username: string = 'anonymous';
  display_name: string = '';
  isMobileDevice: boolean = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'].toLowerCase();
      this.display_name = this.username.toUpperCase();
    })
  }

  ngOnInit(): void {
  }

}
