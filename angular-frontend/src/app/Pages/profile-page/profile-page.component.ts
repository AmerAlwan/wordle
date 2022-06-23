import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend/backend.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
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
  backendService: BackendService;
  userService: UserService;
  dailyGames: number = 0;
  dailyStreak: Number = 0;
  dailyBest: Number = 0;
  dailyWin: String = "0";
  dailyTB: Boolean = false;
  dailyData: any = [];
  timedGames: number = 0;
  timedStreak: Number = 0;
  timedBest: Number = 0;
  timedWin: String = "0";
  timedTB: Boolean = false;
  timedData: any = [];
  unlimitedGames: number = 0;
  unlimitedStreak: Number = 0;
  unlimitedBest: Number = 0;
  unlimitedWin: String = "0";
  unlimitedTB: Boolean = false;
  unlimitedData: any = [];
  blitzGames: number = 0;
  blitzAvg: String = "0";
  blitzMin: String = "0";
  blitzTime: String = "0";
  blitzTB: Boolean = false;
  blitzData: any = [];
  dbuser: String;
  data: { [string: string]: any; } = {};

  constructor(private route: ActivatedRoute, backendService: BackendService, userService: UserService) {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'].toLowerCase();
      this.displayName = this.username.toUpperCase();
    })
    this.backendService = backendService;
    this.userService = userService;


    this.backendService.getUser(this.username).then(data => {
      this.data = data;
      console.log(this.data)
      this.constPage();
    });
    this.dbuser = this.userService.getUsername();
  }

  constPage(): void {
    this.dailyGames = Object.keys(this.data["daily"]["games"]).length;
    this.dailyStreak = this.data["daily"]["daily_streak"];
    this.dailyBest = this.data["daily"]["daily_best"];
    let wins = 0;
    for (let key in this.data["daily"]["games"]) {
      if (this.data["daily"]["games"][key]["success"]) {
        wins += 1;
      }
      let data = {
        "word": this.data["daily"]["games"][key]["word"].toUpperCase(),
        "attempts": this.data["daily"]["games"][key]["attempts"],
        "success": (this.data["daily"]["games"][key]["success"])? "PASSED" : "FAILED",
        "difficulty": this.data["daily"]["games"][key]["difficulty"].toUpperCase()
      };
      this.dailyData.push(data);
    }
    this.dailyData.reverse();
    this.dailyWin = ((wins > 0) ? 100 * (wins / this.dailyGames) : 0).toFixed(2);
    if (this.dailyGames > 0)
      this.dailyTB = true;
    

    this.timedGames = Object.keys(this.data["timed"]["games"]).length;
    this.timedStreak = this.data["timed"]["timed_streak"];
    this.timedBest = this.data["timed"]["timed_best"];
    wins = 0;
    for (let key in this.data["timed"]["games"]) {
      if (this.data["timed"]["games"][key]["success"]) {
        wins += 1;
      }
      let data = {
        "word": this.data["timed"]["games"][key]["word"].toUpperCase(),
        "attempts": this.data["timed"]["games"][key]["attempts"],
        "success": (this.data["timed"]["games"][key]["success"]) ? "PASSED" : "FAILED",
        "time": this.data["timed"]["games"][key]["time"],
        "difficulty": this.data["timed"]["games"][key]["difficulty"].toUpperCase()
      };
      this.timedData.push(data);
    }
    this.timedData.reverse();
    this.timedWin = ((wins > 0) ? 100 * (wins / this.timedGames) : 0).toFixed(2);
    if (this.timedGames > 0)
      this.timedTB = true;

    this.unlimitedGames = Object.keys(this.data["unlimited"]["games"]).length;
    this.unlimitedStreak = this.data["unlimited"]["unlimited_streak"];
    this.unlimitedBest = this.data["unlimited"]["unlimited_best"];
    wins = 0;
    for (let key in this.data["unlimited"]["games"]) {
      if (this.data["unlimited"]["games"][key]["success"]) {
        wins += 1;
      }
      let data = {
        "word": this.data["unlimited"]["games"][key]["word"].toUpperCase(),
        "attempts": this.data["unlimited"]["games"][key]["attempts"],
        "success": (this.data["unlimited"]["games"][key]["success"]) ? "PASSED" : "FAILED",
        "difficulty": this.data["unlimited"]["games"][key]["difficulty"].toUpperCase()
      };
      this.unlimitedData.push(data);
    }
    this.unlimitedData.reverse();
    this.unlimitedWin = ((wins > 0) ? 100 * (wins / this.unlimitedGames) : 0).toFixed(2);
    if (this.unlimitedGames > 0)
      this.unlimitedTB = true;

    this.blitzGames = Object.keys(this.data["blitz"]["games"]).length;
    let words = 0;
    let time = 0;
    for (let key in this.data["blitz"]["games"]) {
      words += this.data['blitz']["games"][key]["words_len"];
      time += this.data['blitz']["games"][key]["time"];

      let data = {
        "words": this.data["blitz"]["games"][key]["words"].toUpperCase(),
        "word_count": this.data["blitz"]["games"][key]["words_len"],
        "time": this.data["blitz"]["games"][key]["time"],
        "difficulty": this.data["blitz"]["games"][key]["difficulty"].toUpperCase()
      };
      this.blitzData.push(data);
    }
    this.blitzData.reverse();
    this.blitzAvg = (words > 0)? (words / this.blitzGames).toFixed(2) : "0";
    this.blitzMin = (words > 0 && time > 0)? (words / (time / 60)).toFixed(2) : "0";
    this.blitzTime = (time / 60).toFixed(2);
    if (this.blitzGames > 0)
      this.blitzTB = true;

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
