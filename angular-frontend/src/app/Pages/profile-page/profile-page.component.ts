import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  username: string = 'anonymous';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
    })
  }

  ngOnInit(): void {
  }

}
