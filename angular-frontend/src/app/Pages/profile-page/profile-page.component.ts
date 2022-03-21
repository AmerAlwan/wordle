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
  default: string = "assets/user-profiles/default.png";

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
    })
  }

  ngOnInit(): void {
  }

}
