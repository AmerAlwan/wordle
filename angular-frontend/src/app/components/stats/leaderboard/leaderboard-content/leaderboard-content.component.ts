import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard-content',
  templateUrl: './leaderboard-content.component.html',
  styleUrls: ['./leaderboard-content.component.css']
})
export class LeaderboardContentComponent implements OnInit {
  users: Array<string>;

  constructor() {
    this.users = new Array<string>(6);
    this.users[0] = "yahia";
    this.users[1] = "yahia1";
    this.users[2] = "yahia2";
    this.users[3] = "yahia3";
    this.users[4] = "yahia4";
    this.users[5] = "yahia5";
    this.users[6] = "yahia6";
  }

  ngOnInit(): void {
  }

}
