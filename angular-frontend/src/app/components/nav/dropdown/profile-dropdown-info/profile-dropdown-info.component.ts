import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-profile-dropdown-info',
  templateUrl: './profile-dropdown-info.component.html',
  styleUrls: ['./profile-dropdown-info.component.css']
})
export class ProfileDropdownInfoComponent implements OnInit {
  @Input() isDropdownOpen: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onMyProfileButtonClick() {
    this.router.navigate(['/user/' + this.userService.getUsername()]);
  }

  onLogoutButtonClick() {
    this.userService.logout();
  }

}
