import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AppSettingsService } from 'src/app/services/appsettings/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';
  constructor(private router: Router, private userService: UserService, private appSettingsService : AppSettingsService) {
    router.events.subscribe((val) => {
      this.userService.loadUserFromLocalStorage();
      this.appSettingsService.setSettingsFromLocalStorage();
    });
  }
}
