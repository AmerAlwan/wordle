import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dropdown-info',
  templateUrl: './profile-dropdown-info.component.html',
  styleUrls: ['./profile-dropdown-info.component.css']
})
export class ProfileDropdownInfoComponent implements OnInit {
  @Input() isDropdownOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMyProfileButtonClick() {
    this.router.navigate(['/user']);
  }

}
